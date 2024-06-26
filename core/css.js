/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Css');


/**
 * List of cursors.
 * @enum {string}
 */
Blockly.Css.Cursor = {
  OPEN: 'handopen',
  CLOSED: 'handclosed',
  DELETE: 'handdelete'
};

/**
 * Current cursor (cached value).
 * @type {string}
 * @private
 */
Blockly.Css.currentCursor_ = '';

/**
 * Large stylesheet added by Blockly.Css.inject.
 * @type {Element}
 * @private
 */
Blockly.Css.styleSheet_ = null;

/**
 * Path to media directory, with any trailing slash removed.
 * @type {string}
 * @private
 */
Blockly.Css.mediaPath_ = '';

/**
 * Inject the CSS into the DOM.  This is preferable over using a regular CSS
 * file since:
 * a) It loads synchronously and doesn't force a redraw later.
 * b) It speeds up loading by not blocking on a separate HTTP transfer.
 * c) The CSS content may be made dynamic depending on init options.
 * @param {boolean} hasCss If false, don't inject CSS
 *     (providing CSS becomes the document's responsibility).
 * @param {string} pathToMedia Path from page to the Blockly media directory.
 */
Blockly.Css.inject = function(hasCss, pathToMedia) {
  // Only inject the CSS once.
  if (Blockly.Css.styleSheet_) {
    return;
  }
  // Placeholder for cursor rule.  Must be first rule (index 0).
  var text = '.blocklyDraggable {}\n';
  if (hasCss) {
    text += Blockly.Css.CONTENT.join('\n');
    if (Blockly.FieldDate) {
      text += Blockly.FieldDate.CSS.join('\n');
    }
  }
  // Strip off any trailing slash (either Unix or Windows).
  Blockly.Css.mediaPath_ = pathToMedia.replace(/[\\\/]$/, '');
  text = text.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
  // Inject CSS tag.
  var cssNode = document.createElement('style');
  document.head.appendChild(cssNode);
  var cssTextNode = document.createTextNode(text);
  cssNode.appendChild(cssTextNode);
  Blockly.Css.styleSheet_ = cssNode.sheet;
  Blockly.Css.setCursor(Blockly.Css.Cursor.OPEN);
};

/**
 * Set the cursor to be displayed when over something draggable.
 * @param {Blockly.Css.Cursor} cursor Enum.
 */
Blockly.Css.setCursor = function(cursor) {
  if (Blockly.Css.currentCursor_ == cursor) {
    return;
  }
  Blockly.Css.currentCursor_ = cursor;
  var url = 'url(' + Blockly.Css.mediaPath_ + '/' + cursor + '.cur), auto';
  // There are potentially hundreds of draggable objects.  Changing their style
  // properties individually is too slow, so change the CSS rule instead.
  var rule = '.blocklyDraggable {\n  cursor: ' + url + ';\n}\n';
  Blockly.Css.styleSheet_.deleteRule(0);
  Blockly.Css.styleSheet_.insertRule(rule, 0);
  // There is probably only one toolbox, so just change its style property.
  var toolboxen = document.getElementsByClassName('blocklyToolboxDiv');
  for (var i = 0, toolbox; toolbox = toolboxen[i]; i++) {
    if (cursor == Blockly.Css.Cursor.DELETE) {
      toolbox.style.cursor = url;
    } else {
      toolbox.style.cursor = '';
    }
  }
  // Set cursor on the whole document, so that rapid movements
  // don't result in cursor changing to an arrow momentarily.
  var html = document.body.parentNode;
  if (cursor == Blockly.Css.Cursor.OPEN) {
    html.style.cursor = '';
  } else {
    html.style.cursor = url;
  }
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Css.CONTENT = [
  '.blocklySvg {',
//    'background-color: #fff;',
    'outline: none;',
  '}',

  '.blocklyWidgetDiv {',
    'display: none;',
    'position: absolute;',
    'z-index: 999;',
  '}',

  '.blocklyTooltipDiv {',
    'background-color: #333;',
    'border-radius: 2px;',
    'color: #fff;',
    'display: none;',
    'font-family: sans-serif;',
    'font-size: 9pt;',
    'opacity: 0.9;',
    'padding: 5px;',
    'position: absolute;',
    'z-index: 1000;',
  '}',

  '.blocklyResizeSE {',
    'cursor: se-resize;',
    'fill: #aaa;',
  '}',

  '.blocklyResizeSW {',
    'cursor: sw-resize;',
    'fill: #aaa;',
  '}',

  '.blocklyResizeLine {',
    'stroke: #888;',
    'stroke-width: 1;',
  '}',

  '.blocklyHighlightedConnectionPath {',
    'fill: #FFDC00;',
    'stroke: #FFDC00;',
    'stroke-width: 4px;',
  '}',

  '.blocklyPathLight {',
    'fill: none;',
    'stroke-linecap: round;',
    'stroke-width: 1;',
  '}',

  '.blocklySelected>.blocklyPath {',
    'stroke: #FFDC00;',
    'stroke-width: 3px;',
  '}',

  '.blocklySelected>.blocklyPathLight {',
    'display: none;',
  '}',

  '.blocklyDragging>.blocklyPath,',
  '.blocklyDragging>.blocklyPathLight {',
    'fill-opacity: .8;',
    'stroke-opacity: .8;',
  '}',

  '.blocklyDragging>.blocklyPathDark {',
    'display: none;',
  '}',

  '.blocklyDisabled>.blocklyPath {',
    'fill-opacity: .3;',
    'stroke-opacity: .3;',
  '}',

  '.blocklyDisabled>.blocklyPathLight,',
  '.blocklyDisabled>.blocklyPathDark {',
    'display: none;',
  '}',

  '.blocklyText {',
    'cursor: default;',
    'fill: #fff;',
    'font-family: sans-serif;',
    'font-size: 11pt;',
  '}',
  '.blocklyText.brick_label {',
    'fill: #000;',
    'font-weight: bold;',
    'font-size: 14pt;',
  '}',
  '.blocklyText.monospace {',
    'font-family: "Courier New", Courier, monospace;',
  '}',
  '.blocklyNonEditableText>text {',
    'pointer-events: none;',
  '}',

  '.blocklyNonEditableText>rect,',
  '.blocklyEditableText>rect {',
    'fill: #fff;',
    'fill-opacity: .6;',
  '}',

  '.blocklyNonEditableText>text,',
  '.blocklyEditableText>text {',
    'fill: #000;',
  '}',

  '.blocklyEditableText:hover>rect {',
    'stroke: #fff;',
    'stroke-width: 2;',
  '}',

  '.blocklyBubbleText {',
    'fill: #000;',
  '}',

  /*
    Don't allow users to select text.  It gets annoying when trying to
    drag a block and selected text moves instead.
  */
  '.blocklySvg text {',
    'user-select: none;',
    '-moz-user-select: none;',
    '-webkit-user-select: none;',
    'cursor: inherit;',
  '}',

  '.blocklyHidden {',
    'display: none;',
  '}',

  '.blocklyFieldDropdown:not(.blocklyHidden) {',
    'display: block;',
  '}',

  '.blocklyIconGroup {',
    'cursor: default;',
  '}',

  '.blocklyIconGroup:not(:hover),',
  '.blocklyIconGroupReadonly:not(.no){',
    'opacity: .6;',
  '}',

  '.blocklyIconShape {',
    'stroke: #fff;',
    'stroke-width: 1px;',
  '}',

  '.blocklyIconSymbol {',
    'fill: #fff;',
  '}',
  
  '.blocklyIconBlocking {',
    'stroke-width: 0.5;',
    'fill: #fff;',
  '}',
  
  '.blocklyIconMarkWarningError {',
    'fill: #000;',
  '}',
  
  'g .blocklyIconGroup:hover path[class="blocklyIconMarkWarningError"] {',
    'fill: #fff;',
    'cursor: pointer',
  '}', 
  'g .blocklyIconGroup:hover circle[class="blocklyIconMarkWarningError"] {',
    'fill: #fff;',
    'cursor: pointer',
  '}', 
  
  '.blocklyIconMarkWarningError:hover {',
    'fill: #fff;',
  '}',

  '.blocklyMinimalBody {',
    'margin: 0;',
    'padding: 0;',
    'transform: none;',
  '}',

  '.blocklyCommentTextarea {',
    'background-color: #fff;',
    'border: 0;',
    'margin: 0;',
    'padding: 2px;',
    'resize: none;',
    'outline: 0 none',
  '}',

  '.blocklyHtmlInput {',
    'border: none;',
    'border-radius: 4px;',
    'font-family: sans-serif;',
    'height: 100%;',
    'margin: 0;',
    'outline: none;',
    'padding: 0 1px;',
    'width: 100%;',
    'line-height: normal;',
  '}',

  '.blocklyMainBackground {',
    'stroke-width: 1;',
    'stroke: #c6c6c6;',  /* Equates to #ddd due to border being off-pixel. */
  '}',

  '.blocklyMutatorBackground {',
    'fill: #fff;',
    'stroke: #ddd;',
    'stroke-width: 1;',
  '}',

  '.blocklyFlyoutBackground {',
    'fill-opacity: 1;',
  '}',
  
  '.blocklyCon {',
    'fill: #eee;',
    'fill-opacity: 1;',
  '}',

  '.blocklyConSelected {',
    'fill-opacity: .65;',
  '}',
  
  '.blocklyScrollbarBackground {',
    'opacity: 0;',
    'display: none;',
  '}',

  '.blocklyScrollbarKnob {',
    'display: none;',
  '}',

  '.blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,',
  '.blocklyScrollbarKnob:hover {',
    'fill: #bbb;',
  '}',

  '.blocklyZoom>image {',
    'opacity: .4;',
  '}',

  '.blocklyZoom>image:hover {',
    'opacity: .6;',
  '}',

  '.blocklyZoom>image:active {',
    'opacity: .8;',
  '}',
  
  'rect[class="blocklyButtonBack"] { ',
    'fill: #fff;',
  '}',
  
  'g .robButtonHidden {',
    'display: none',
  '}', 
  
  'g .robButton:hover rect[class="blocklyButtonBack"] {',
    'fill: #BACC1E;',
    'cursor: pointer',
  '}', 
  
  'g .robButton:hover path[class="blocklyButtonPath"] {',
    'cursor: pointer',
  '}', 
  
  'g .robButton.disabled {',
    'pointer-events: none;',
    'cursor: default;',
  '}',

  'g #runOnBrick.disabled {',
    'pointer-events: all;',
    'cursor: default;',
  '}',

  'g .robButton.disabled path[class="blocklyButtonPath"] {',
    'fill: #bbb',
  '}',

  'g #runOnBrick.disabled:hover rect[class="blocklyButtonBack"] {',
    'fill: #ffffff;',
    'cursor: default;',
  '}',

  'g #runOnBrick.disabled:hover path[class="blocklyButtonPath"] {',
    'cursor: default;',
  '}',
  

  /* Darken flyout scrollbars due to being on a grey background. */
  /* By contrast, workspace scrollbars are on a white background. */
  '.blocklyFlyout .blocklyScrollbarKnob {',
    'fill: #bbb;',
  '}',

  '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,',
  '.blocklyFlyout .blocklyScrollbarKnob:hover {',
    'fill: #aaa;',
  '}',

  '.blocklyInvalidInput {',
    'background: #faa;',
  '}',

  '.blocklyAngleCircle {',
    'stroke: #444;',
    'stroke-width: 1;',
    'fill: #ddd;',
    'fill-opacity: .8;',
  '}',

  '.blocklyAngleMarks {',
    'stroke: #444;',
    'stroke-width: 1;',
  '}',

  '.blocklyAngleGauge {',
    'fill: #f88;',
    'fill-opacity: .8;',
  '}',

  '.blocklyAngleLine {',
    'stroke: #f00;',
    'stroke-width: 2;',
    'stroke-linecap: round;',
  '}',

  '.blocklyContextMenu {',
    'border-radius: 4px;',
  '}',

  '.blocklyDropdownMenu {',
    'padding: 0 !important;',
  '}',

  /* Override the default Closure URL. */
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
    'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
  '}',

  /* Category tree in Toolbox. */
  '.blocklyToolboxDiv {',
    'background-color: #eee;',
    'overflow-x: hidden;',
    'overflow-y: auto;',
    'position: absolute;',
  '}',

  '.blocklyTreeRoot {',
    'padding: 10px 0;',
  '}',

  '.blocklyTreeRoot:focus {',
    'outline: none;',
  '}',

//  '.blocklyTreeRow {',
//    'height: 22px;',
//    'line-height: 22px;',
//    'margin-bottom: 3px;',
//    'padding-right: 8px;',
//    'white-space: nowrap;',
//  '}',
  
  '.blocklyTreeRow {',
    'height: 40px;',
    'line-height: 0;',
    'margin-bottom: 6px;',
   '}',
  
  '.blocklyToolboxDiv.small .blocklyTreeRow {',
    'width: 55px;',
  '}',
  '.blocklyToolboxDiv.scroll.small .blocklyTreeRow {',
    'width: 70px;', // 55px + 17px (usually the browsers scrollbar width)
  '}',

  '.blocklyHorizontalTree {',
    'float: left;',
    'margin: 1px 5px 8px 0;',
  '}',

  '.blocklyHorizontalTreeRtl {',
    'float: right;',
    'margin: 1px 0 8px 5px;',
  '}',

//  '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
//    'margin-left: 8px;',
//  '}',
  '.blocklyTreeRow:hover {',
    'cursor: pointer',
  '}',

  '.blocklyTreeRow:not(.blocklyTreeSelected):hover {',
    'background-color: #e4e4e4;',
    'cursor: pointer',
  '}',
  
  '.toolboxIcon {',
    'display: inline-block;',
    'position: relative;',
    'top: 20px;',
    'left: 8px;',
    'font-size: 24px;',
    'color: #fff;',
    'float: left;',
    'height: 0;',
    'visibility: hidden',
  '}',
  
  '.blocklyToolboxDiv.small .toolboxIcon {',
    'visibility: visible', 
  '}',
  
  '.blocklyTreeSeparator {',
    'border-bottom: solid #e5e5e5 1px;',
    'height: 0;',
    'margin: 5px 0;',
  '}',

  '.blocklyTreeSeparatorHorizontal {',
    'border-right: solid #e5e5e5 1px;',
    'width: 0;',
    'padding: 5px 0;',
    'margin: 0 5px;',
  '}',


  '.blocklyTreeIcon {',
    'background-image: url(<<<PATH>>>/sprites.png);',
    'height: 16px;',
    'vertical-align: middle;',
    'width: 16px;',
  '}',
  '.toolboxIcon.typcn:before {',
    'line-height:0',
  '}',
  '.blocklyTreeIconClosedLtr {',
    'background-position: -32px -1px;',
  '}',

  '.blocklyTreeIconClosedRtl {',
    'background-position: 0px -1px;',
  '}',

  '.blocklyTreeIconOpen {',
    'background-position: -16px -1px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {',
    'background-position: -32px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {',
    'background-position: 0px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconOpen {',
    'background-position: -16px -17px;',
  '}',

  '.blocklyTreeIconNone,',
  '.blocklyTreeSelected>.blocklyTreeIconNone {',
    'background-position: -48px -1px;',
  '}',

//  '.blocklyTreeLabel {',
//    'cursor: default;',
//    'font-family: sans-serif;',
//    'font-size: 16px;',
//    'padding: 0 3px;',
//    'vertical-align: middle;',
//  '}',
  '.blocklyTreeLabel {',
    'font-family: sans-serif;',
    'position: relative;',
    'top: 20px;',
    'float: left;',
    'font-size: 16pt;',
    'color: #fff;',
    'padding: 0 0 0 3px;',
  '}',
  
  '.blocklyTreeSub {', 
    '  font-size: 10pt;', 
  '}',
  
  '.blocklyToolboxDiv.small  .blocklyTreeLabel {',
    'visibility: hidden',
  '}',
  
  '.blocklyTreeRow::after {',
    'background-image: url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><g><path class=\"blocklyConSelected\" fill=\"%23eee\" d=\"M1,41 v-11 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10 h30v41h-30z\"></path><path class=\"blocklyToolboxBackground\" stroke=\"%23eee\" stroke-width=\"2\" fill=\"none\" d=\"M1,40 v-10 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10\"></path></g></svg>\');',
    'content: "";',
    'width: 15px;',
    'height: 40px;',
    'float: right;',
    'display: inline-block;',
  '}',
  
  '.blocklyTreeRow.selected::after {',
    'background-image: url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><g><path class=\"blocklyConSelected\" fill-opacity=\"0.7\" fill=\"%23eee\" d=\"M1,41 v-11 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10 h30v41h-30z\"></path><path class=\"blocklyToolboxBackground\" stroke=\"%23eee\" stroke-width=\"2\" fill=\"none\" d=\"M1,40 v-10 l7.8,0.5 l2.5-5.5 c3-10.7,0.3-16.3-10.3-15.7 v-10\"></path></g></svg>\');',
  '}',
 
  '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow .blocklyTreeLabel {',
    'float: right;',
    'padding: 0 3px 0 6px;',
  '}',
  
  '.blocklyToolboxDiv.scroll .blocklyTreeRow::after {',
    'width: 15px;',
  '}',
  
   '.blocklyToolboxDiv.scroll.small .blocklyTreeRow::after {',
    'width: 30px;',
  '}',
   '.blocklyToolboxDiv.scroll.small .blocklyTreeLabel {',
    'padding: 0 17px 0 3px;',
  '}',
 
  '.blocklyTreeSelected .blocklyTreeLabel {',
    'color: #fff;',
  '}',

  /* Copied from: goog/css/colorpicker-simplegrid.css */
  /*
   * Copyright 2007 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /* Author: pupius@google.com (Daniel Pupius) */

  /*
    Styles to make the colorpicker look like the old gmail color picker
    NOTE: without CSS scoping this will override styles defined in palette.css
  */
  '.blocklyWidgetDiv .goog-palette {',
    'outline: none;',
    'cursor: default;',
  '}',

  '.blocklyWidgetDiv .goog-palette-table {',
    'border: 1px solid #666;',
    'border-collapse: collapse;',
  '}',

  '.blocklyWidgetDiv .goog-palette-cell {',
    'height: 13px;',
    'width: 15px;',
    'margin: 0;',
    'border: 0;',
    'text-align: center;',
    'vertical-align: middle;',
    'border-right: 1px solid #666;',
    'font-size: 1px;',
  '}',

  '.blocklyWidgetDiv .goog-palette-colorswatch {',
    'position: relative;',
    'height: 13px;',
    'width: 15px;',
    'border: 1px solid #666;',
  '}',

  '.blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {',
    'border: 1px solid #FFF;',
  '}',

  '.blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {',
    'border: 1px solid #000;',
    'color: #fff;',
  '}',

  /* Copied from: goog/css/menu.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menu {',
    'background: #fff;',
    'border-color: #ccc #666 #666 #ccc;',
    'border-style: solid;',
    'border-width: 1px;',
    'cursor: default;',
    'font: normal 13px Arial, sans-serif;',
    'margin: 0;',
    'outline: none;',
    'padding: 4px 0;',
    'position: absolute;',
    'overflow-y: auto;',
    'overflow-x: hidden;',
    'max-height: 100%;',
    'z-index: 20000;',  /* Arbitrary, but some apps depend on it... */
  '}',

  /* Copied from: goog/css/menuitem.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuItemRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  /**
   * State: resting.
   *
   * NOTE(mleibman,chrishenry):
   * The RTL support in Closure is provided via two mechanisms -- "rtl" CSS
   * classes and BiDi flipping done by the CSS compiler.  Closure supports RTL
   * with or without the use of the CSS compiler.  In order for them not
   * to conflict with each other, the "rtl" CSS classes need to have the #noflip
   * annotation.  The non-rtl counterparts should ideally have them as well, but,
   * since .goog-menuitem existed without .goog-menuitem-rtl for so long before
   * being added, there is a risk of people having templates where they are not
   * rendering the .goog-menuitem-rtl class when in RTL and instead rely solely
   * on the BiDi flipping by the CSS compiler.  That's why we're not adding the
   * #noflip to .goog-menuitem.
   */
  '.blocklyWidgetDiv .goog-menuitem {',
    'color: #000;',
    'font: normal 13px Arial, sans-serif;',
    'list-style: none;',
    'margin: 0;',
     /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
    'padding: 4px 7em 4px 28px;',
    'white-space: nowrap;',
  '}',
  
  '.blocklyWidgetDiv .goog-menuitem.dropdownImage{',
    'padding: 4px 17px 4px 28px;',
  '}',
  /* BiDi override for the resting state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {',
     /* Flip left/right padding for BiDi. */
    'padding-left: 7em;',
    'padding-right: 28px;',
  '}',

  /* If a menu doesn't have checkable items or items with icons, remove padding. */
  '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
  '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {',
    'padding-left: 12px;',
  '}',

  /*
   * If a menu doesn't have items with shortcuts, leave just enough room for
   * submenu arrows, if they are rendered.
   */
  '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {',
    'padding-right: 20px;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-content {',
    'color: #000;',
    'font: normal 13px Arial, sans-serif;',
  '}',

  /* State: disabled. */
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,',
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {',
    'color: #ccc !important;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {',
    'opacity: 0.3;',
    '-moz-opacity: 0.3;',
    'filter: alpha(opacity=30);',
  '}',

  /* State: hover. */
  '.blocklyWidgetDiv .goog-menuitem-highlight,',
  '.blocklyWidgetDiv .goog-menuitem-hover {',
    'background-color: #d6e9f8;',
     /* Use an explicit top and bottom border so that the selection is visible',
      * in high contrast mode. */
    'border-color: #d6e9f8;',
    'border-style: dotted;',
    'border-width: 1px 0;',
    'padding-bottom: 3px;',
    'padding-top: 3px;',
  '}',

  /* State: selected/checked. */
  '.blocklyWidgetDiv .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-icon {',
    'background-repeat: no-repeat;',
    'height: 16px;',
    'left: 6px;',
    'position: absolute;',
    'right: auto;',
    'vertical-align: middle;',
    'width: 16px;',
  '}',

  /* BiDi override for the selected/checked state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {',
     /* Flip left/right positioning. */
    'left: auto;',
    'right: 6px;',
  '}',

  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
     /* Client apps may override the URL at which they serve the sprite. */
    'background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;',
  '}',

  /* Keyboard shortcut ("accelerator") style. */
  '.blocklyWidgetDiv .goog-menuitem-accel {',
    'color: #999;',
     /* Keyboard shortcuts are untranslated; always left-to-right. */
     /* #noflip */
    'direction: ltr;',
    'left: auto;',
    'padding: 0 6px;',
    'position: absolute;',
    'right: 0;',
    'text-align: right;',
  '}',

  /* BiDi override for shortcut style. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {',
     /* Flip left/right positioning and text alignment. */
    'left: 0;',
    'right: auto;',
    'text-align: left;',
  '}',

  /* Mnemonic styles. */
  '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint {',
    'text-decoration: underline;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator {',
    'color: #999;',
    'font-size: 12px;',
    'padding-left: 4px;',
  '}',

  /* Copied from: goog/css/menuseparator.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menuseparator {',
    'border-top: 1px solid #ccc;',
    'margin: 4px 0;',
    'padding: 0;',
  '}',

  ''
];
