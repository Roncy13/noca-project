export const Choices = {
  Default: 'Default',
  Directory: 'Directory',
  Global: 'Global',

};
export const apiPath = '{{HlprApiDirectory location}}/{{DashCase name}}.actions.ts';
export const apiPathComponent = '{{HlprCheckDirectory component type name directory}}/{{DashCase name}}.{{extension}}.ts';

export default {
  Choices,
  apiPath,
  apiPathComponent
}