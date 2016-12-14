#!/usr/bin/env node

require("babel-register");
require("babel-polyfill");

require("./db.js");
require("../server.js");
