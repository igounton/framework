#!/usr/bin/env node

import { lstatSync, readdirSync, readlinkSync, realpathSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pluginsDir = join(root, "plugins");
let checked = 0;

function fail(message) {
	console.error(message);
	process.exitCode = 1;
}

for (const pluginName of readdirSync(pluginsDir).sort()) {
	const pluginDir = join(pluginsDir, pluginName);
	if (!lstatSync(pluginDir).isDirectory()) {
		continue;
	}

	const skillsDir = join(pluginDir, "skills");
	try {
		if (!lstatSync(skillsDir).isDirectory()) {
			continue;
		}
	} catch {
		continue;
	}

	for (const skillName of readdirSync(skillsDir).sort()) {
		const skillDir = join(skillsDir, skillName);
		if (!lstatSync(skillDir).isDirectory()) {
			continue;
		}

		const readmePath = join(skillDir, "README.md");
		const expectedTarget = "SKILL.md";
		const expectedResolved = realpathSync(join(skillDir, expectedTarget));

		let readmeStat;
		try {
			readmeStat = lstatSync(readmePath);
		} catch {
			fail(`missing README symlink: plugins/${pluginName}/skills/${skillName}/README.md`);
			continue;
		}
		checked += 1;

		if (!readmeStat.isSymbolicLink()) {
			fail(`not a symlink: plugins/${pluginName}/skills/${skillName}/README.md`);
			continue;
		}

		const target = readlinkSync(readmePath);
		if (target !== expectedTarget) {
			fail(`bad target: plugins/${pluginName}/skills/${skillName}/README.md -> ${target}`);
			continue;
		}

		const resolved = realpathSync(readmePath);
		if (resolved !== expectedResolved) {
			fail(
				`bad resolution: plugins/${pluginName}/skills/${skillName}/README.md -> ${resolved}, expected ${expectedResolved}`,
			);
		}
	}
}

if (!process.exitCode) {
	console.log(`Skill README symlink validation passed for ${checked} direct README entries.`);
}
