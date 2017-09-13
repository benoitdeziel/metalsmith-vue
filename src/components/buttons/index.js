'use strict';

import * as angular from 'angular';
import LandrButtonComponent from './buttons.component';

// /**
//  * @ngdoc component
//  * @name Button
//  * @description  My application
//  */

export default angular.module('landr.components.button', [])
    .component('landrButton', LandrButtonComponent)
    .name;
