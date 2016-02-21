/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { ToastsController } from './toasts/toasts.controller';
import { FormsController } from './forms/forms.controller';
import { ButtonsController } from './buttons/buttons.controller';
import { SlidePanelsController } from './slide-panels/slide-panels.controller';
import { ModalsController } from './modals/modals.controller';

import { Popup } from './components/modal/modal.service';
import { Modal } from './components/modal/modal.service';
import { Dialog } from './components/dialog/dialog.service';

import { slidePanel } from './components/slide-panel/slide-panel.directive';
import { tab } from './components/tab/tab.directive';
import { tabs } from './components/tabs/tabs.directive';
import { select } from './components/select/select.directive';
import { selectItems } from './components/select-items/select-items.directive';
import { selectItem } from './components/select-item/select-item.directive';
import { selectItemActive } from './components/select-item-active/select-item-active.directive';

// import { selectItemPlaceholder } from './components/select-item-placeholder/select-item-placeholder.directive';


module uiThing {

  'use strict';

  angular.module('uiThing', [
    'ui.router',
    'ngMessages',
    'angularModalService',
    'ngAnimate',
    'ui.select',
    'ngSanitize',
    'toastr'
  ])

    .config(config)
    .run(runBlock)

    .controller('MainController', MainController)
    .controller('ToastsController', ToastsController)
    .controller('FormsController', FormsController)
    .controller('ButtonsController', ButtonsController)
    .controller('SlidePanelsController', SlidePanelsController)
    .controller('ModalsController', ModalsController)

    .service('tobPopup', Popup)
    .service('tobModal', Modal)
    .service('tobDialog', Dialog)
    .directive('tobSelect', select)
    .directive('tobSelectItems', selectItems)
    .directive('tobSelectItem', selectItem)
    .directive('tobSelectItemActive', selectItemActive)
    .directive('tobSlidePanel', slidePanel)
    .directive('tobTab', tab)
    .directive('tobTabs', tabs)

  ;
    // .directive('tobSelectPlaceholder', selectItemPlaceholder);

}

/**
 * + Select menu
 * + Drop downs?
 * + Toggles / checkboxes
 * + Radios
 */
