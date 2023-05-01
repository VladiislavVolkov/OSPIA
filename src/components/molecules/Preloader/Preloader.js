import { Component } from '../../../core/Component';

class Preloader extends Component {
  constructor() {
    super();
    this.isShadow = true;
  }

  static get observedAttributes() {
    return ['is-loading'];
  }

  render() {
    return `
    <style>
        @keyframes spin {
            from {
                transform: rotate(0)
            }
            
            to {
                transform: rotate(360deg)
            }
        }
    
    .preloader {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255,255,255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index:9999;
        }

    .spinner {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 7px solid #9ebfbd;
        display: block;
        border-left-color: transparent;
        animation: 1s linear 0s infinite spin;
        }
    </style>
    <div>
        ${
          JSON.parse(this.props['is-loading'])
            ? `
                <div class="preloader">
                    <div class="spinner"></div>
                </div>
            `
            : ''
        }
        <slot></slot>
    </div>    
    `;
  }
}

customElements.define('it-preloader', Preloader);
