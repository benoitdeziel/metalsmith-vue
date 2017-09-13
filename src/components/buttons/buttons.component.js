import './buttons.scss';

class LandrButtonCtrl {
    constructor() {

    }

    $onInit() {

    }
}

const LandrButtonComponent = {
    bindings: {
    },
    transclude: true,
    // templateUrl: 'components/buttons/buttons.tpl.html',
    template: `<button class="Button">The button</button>`,
    controller: LandrButtonCtrl
};

export default LandrButtonComponent;
