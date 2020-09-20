import { LitElement, html, customElement, property, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { RoadCamCardConfig } from './types';
import * as pack from '../package.json';

/* eslint-disable-next-line no-console */
console.debug(
  `%c ${pack.name.toUpperCase()} %c${pack.version} IS INSTALLED`,
  'color: white; font-weight: bold; background: blue',
  'color: white; font-weight: bold; background: blue',
);

@customElement('road-cam-card')
export class RoadCamCard extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() private _config!: RoadCamCardConfig;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @property() private _helpers?: any;

  @property() private _date: Date = new Date();
  @property() private _first_updated = true;
  public setConfig(config: RoadCamCardConfig): void {
    if (!config.image) {
      throw new Error('Specify an image.');
    }

    this._config = {
      ...config,
    };

    this.loadCardHelpers();
  }

  public getCardSize(): number {
    return 3;
  }

  protected firstUpdated(): void {
    this._first_updated = false;
  }

  protected shouldUpdate(): boolean {
    if (this._first_updated) {
      return true;
    }
    const minute = 60000;
    return Date.now() - this._date.getTime() >= minute;
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this.hass || !this._helpers) {
      return html``;
    }

    this._date = new Date();

    const pictureCard = {
      type: 'picture',
      tap_action: {
        action: 'call-service',
        service: 'browser_mod.popup',
        service_data: {
          title: 'Cam',
          large: true,
          card: {
            type: 'picture',
            image: this._config.image,
          },
        },
      },
    };

    const defaultRowConfig = Object.assign(this._config, pictureCard);
    const element = this._helpers.createCardElement(defaultRowConfig);
    element.hass = this.hass;

    return html`
      ${element}
    `;
  }

  private async loadCardHelpers(): Promise<void> {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    this._helpers = await (window as any).loadCardHelpers();
  }
}
