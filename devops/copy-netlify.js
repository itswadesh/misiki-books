const shell = require("shelljs");
shell.mkdir("dist");
shell.cp("-R", "devops/_redirects", "dist/_redirects"); // netlify not working for dynamic urls
