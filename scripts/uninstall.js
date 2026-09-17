#!/usr/bin/env node
// manbun — removes state manbun wrote outside the plugin's own files:
// the mode flag, the config file, the statusLine entry it added to
// settings.json, and its entries in ~/.cursor/hooks.json. Plugin files
// themselves are removed by each host's own uninstall command (see README);
// this only cleans up what those commands can't see.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { getConfigPath, getClaudeDir } = require('../hooks/manbun-config');
const cursorHooks = require('./cursor-hooks');

const STATUSLINE_SCRIPT = 'manbun-statusline';

function removeIfExists(filePath, label) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Removed ${label}: ${filePath}`);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}

removeIfExists(path.join(getClaudeDir(), '.manbun-active'), 'mode flag');
removeIfExists(path.join(os.homedir(), '.cursor', '.manbun-active'), 'Cursor mode flag');
removeIfExists(getConfigPath(), 'config file');

// Cursor hooks (#817): drop only manbun's entries from ~/.cursor/hooks.json,
// keep every other hook the user configured there.
try {
  const hooksFile = cursorHooks.uninstall('user');
  if (hooksFile) console.log(`Removed manbun hooks from ${hooksFile}`);
} catch (e) {
  if (e instanceof SyntaxError) {
    // manbun: malformed hooks.json — can't safely edit it; leave intact, warn
    console.warn(`~/.cursor/hooks.json is malformed — could not remove the manbun hook entries. Remove them manually from: ${cursorHooks.hooksPath('user')} (${e.message})`);
  } else {
    throw e;
  }
}

const settingsPath = path.join(getClaudeDir(), 'settings.json');
try {
  const raw = fs.readFileSync(settingsPath, 'utf8').replace(/^\uFEFF/, '');
  const settings = JSON.parse(raw);
  const cmd = settings.statusLine && settings.statusLine.command;
  // Only remove the parts manbun owns. If the user combined statuslines
  // (e.g. caveman && manbun), keep the other plugin's command intact.
  // manbun: splits on && / ; to detect other segments — good enough; a user
  // piping statuslines together is on their own.
  if (typeof cmd === 'string' && cmd.includes(STATUSLINE_SCRIPT)) {
    const parts = cmd
      .split(/&&|;/)
      .map((s) => s.trim())
      .filter(Boolean);
    const others = parts.filter((s) => !s.includes(STATUSLINE_SCRIPT));
    if (others.length === 0) {
      delete settings.statusLine;
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
      console.log(`Removed manbun statusLine entry from ${settingsPath}`);
    } else {
      settings.statusLine.command = others.join(' && ');
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
      console.log(`Removed manbun statusLine segment from ${settingsPath}`);
    }
  }
} catch (e) {
  if (e.code === 'ENOENT') {
    // no settings.json — nothing to clean
  } else if (e instanceof SyntaxError) {
    // manbun: malformed settings.json — can't safely edit it; leave intact, warn
    console.warn(`settings.json is malformed — could not remove the manbun statusLine entry. Remove it manually from: ${settingsPath} (${e.message})`);
  } else {
    throw e;
  }
}
