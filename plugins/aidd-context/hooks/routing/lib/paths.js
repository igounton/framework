'use strict';

const os = require('os');
const path = require('path');

const INSTALLED_PLUGINS = path.join(os.homedir(), '.claude', 'plugins', 'installed_plugins.json');
const KNOWN_MARKETPLACES = path.join(os.homedir(), '.claude', 'plugins', 'known_marketplaces.json');
const USER_DEFAULT_DATA = path.join(os.homedir(), '.claude', 'plugins', 'data', 'aidd-context', 'routing');

function dataDir() {
  if (process.env.AIDD_ROUTING_DATA) return process.env.AIDD_ROUTING_DATA;
  if (process.env.CLAUDE_PLUGIN_DATA) return path.join(process.env.CLAUDE_PLUGIN_DATA, 'routing');
  return USER_DEFAULT_DATA;
}

module.exports = { INSTALLED_PLUGINS, KNOWN_MARKETPLACES, USER_DEFAULT_DATA, dataDir };
