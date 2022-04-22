road-cam-card
=================
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

Show an image and use browser_mod to show it larger on tap.

## Install

### HACS installation
While this plugin can be installed by HACS, it is not included in the default repository of HACS.

1. Add this repository as a custom repository inside HACS settings. Make sure you select `Lovelace` as Category.

2. Install the plugin from the Overview page.

### Manual install
1. Download and copy `road-cam-card.js` from the [latest release](https://github.com/bratanon/lovelace-road-cam-card/releases/latest) into your `config/www` directory.

2. Add a reference to `road-cam-card.js` inside your `ui-lovelace.yaml` or through the raw config editor interface.

    ```yaml
    resources:
      - url: /local/road-cam-card.js
        type: module
    ```

## Usage

### Options

#### Row options
| Name  | Type | Default | Description |
|-------|------|---------|-------------|
| type  | string | **required** | `custom:road-cam-card.js`
| title | string | **required** | A card title
| image | string | **required** | The URL to an image

### Example usage

```yaml
 - type: custom:road-cam-card
   title: Kålleredsmotet norrut
   image: https://api.trafikinfo.trafikverket.se/v1/Images/TrafficFlowCamera_39635270.Jpeg?type=fullsize
```

## License
This project is under the MIT license.
