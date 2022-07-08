import type { StorybookConfig } from '@storybook/core-common';

export const rootMain: StorybookConfig = {
  stories: [],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links'],

  //    webpackFinal: async (config) => {
  //    // add config
  //     return config
  //   },
};
