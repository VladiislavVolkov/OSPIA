export class Component extends HTMLElement {
  constructor() {
    super();
    this.props = {};
    this.state = {};
    this.isShadow = false;
  }

  //
  setState(callback) {
    this.state = callback(this.state);
    if (this.isShadow) {
      this.shadowRoot.innerHTML = this.render();
    } else {
      this.innerHTML = this.render();
    }
  }

  // connectedCallback - выполняет ту же фунцкию, что и componentDidMount
  connectedCallback() {
    if (this.isShadow) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = this.render();
    } else {
      this.innerHTML = this.render();
    }
    this.componentDidMount();
  }

  disconnectedCallback() {
    this.componentWillUnmount();
  }

  // вызовется когда атрибуты нашего компонента будут изменены
  // name - имя атрибута, который был изменен
  // oldValue - старое значение атрибута
  // newValue - новое значение атрибута
  attributeChangedCallback(name, oldValue, newValue) {
    this.componentWillUpdate(name, oldValue, newValue);
    this.getAttributeNames().forEach((attributeName) => {
      this.props[attributeName] = this.getAttribute(attributeName);
    });
  }

  // компонент смонтировался
  componentDidMount() {}

  // компонент размонтируется
  componentWillUnmount() {}

  // компонент будет обновляться
  componentWillUpdate() {}

  render() {}
}
