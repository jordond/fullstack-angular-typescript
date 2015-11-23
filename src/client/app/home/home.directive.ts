'use strict';

interface IHomeScope {
  name: string;
  welcome: () => string;
}

class Home implements ng.IDirective {
  /* @ngInject */
  constructor() {}

  static instance(): ng.IDirective {
    return new Home();
  }

  bindToController: boolean = true;

}