import { LitElement, html, TemplateResult, CSSResultGroup, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard } from 'custom-card-helpers';
import { popUp } from 'card-tools/src/popup';
import * as pack from '../package.json';

/* eslint-disable-next-line no-console */
console.debug(
  `%c ${pack.name.toUpperCase()} %c${pack.version} IS INSTALLED`,
  'color: white; font-weight: bold; background: blue',
  'color: white; font-weight: bold; background: blue',
);

export interface RoadCamCardConfig {
  type: string;
  title?: string;
  image?: string;
}

@customElement('road-cam-card')
export class RoadCamCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: RoadCamCardConfig;

  private _last_updated: Date = new Date();

  private _first_updated = true;

  public setConfig(config: RoadCamCardConfig): void {
    if (!config.image) throw new Error('Specify an image.');
    if (!config.title) throw new Error('Specify a title.');

    this._config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  protected firstUpdated(): void {
    this._first_updated = false;
  }

  protected shouldUpdate(): boolean {
    if (this._first_updated) return true;

    const wait = 20000;
    return Date.now() - this._last_updated.getTime() >= wait;
  }

  private createPopup() {
    const card = {
      type: 'picture',
      image: this._config.image,
      tap_action: "none"
    };

    popUp(this._config.title, card, true, undefined, false);
  }

  protected render(): TemplateResult | void {
    if (!this.hass) return html``;

    this._last_updated = new Date();

    return html`
      <ha-card .header=${this._config.title}>
        <hui-image
          @click=${this.createPopup} 
          .hass=${this.hass} 
          .image=${this._config.image} 
        />
      </ha-card>
    `
  }
}
