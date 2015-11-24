'use strict';

require('./home.scss');

interface IHomeScope {
  name: string;
}

interface IHomeVm {
  title: string;
  welcome: () => void;
}

class Home implements ng.IDirective {
  /* @ngInject */
  constructor() { }

  static instance(): ng.IDirective {
    return new Home();
  }

  bindToController: boolean = true;
  controller: any = HomeController; // to change to type HomeController? use constructor?
  controllerAs: string = 'vm';
  restrict: string = 'EA';
  template: any = require('./home.tpl.html');
  scope: IHomeScope = {
    'name': '@'
  };

}

class HomeController implements IHomeScope, IHomeVm {
  public name: string;

  public title: string;

  /* @ngInject */
  constructor() {
    // maybe have to put stuff in here?
    console.log('inside home directive: ' + this.name + ' title ' + this.title);
  }

  welcome() {
    console.log(this.name + ' stuff and ' + this.title);
  }
}

export default Home.instance;
