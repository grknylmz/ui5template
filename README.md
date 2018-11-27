## At root folder run npm init


```

{
  "name": "ui5test",
  "version": "1.0.0",
  "description": "",
  "main": "../webapp/index.html",
  "scripts": {
    "start": "browser-sync start -s \"webapp/\" -f . --no-notify --host localhost --port 9000",
    "prod": "browser-sync start -s \"dist/\" -f . --no-notify --host localhost --port 9000",
    "build": "grunt"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@sap/grunt-sapui5-bestpractice-build": "^1.3.64"
  }
}

```

## To add SAP NPM Registry for Grunt

```

The SAP NPM Registry
SAP maintains a public NPM registry providing Node.js modules for use by application developers.

Whether you are using command-line tools or graphical tools to build your Node.js application, you can configure the build to use the packages that are available in registries which make Node Package Modules available for public consumption, for example, "registry.npmjs.org". SAP maintains a public NPM registry that contains a selection of SAP-specific features and functions, which you can configure your build tools to consider at build time, as described below:

NPM Registry Configuration for Command-Line and Build Tools

NPM Registry Configuration for SAP Web IDE for SAP HANA

NPM Registry Configuration for Command-Line and Build Tools
If you are using command-line tools to build your Node.js applications for XS advanced, you can configure the tools to use a particular NPM registry to resolve the dependencies between resources specified in the deployment descriptors. To specify the SAP NPM registry, add the "@sap:registry=" property to the .npmrc resource-configuration file, as illustrated in the following example:

Sample Code
NPM Registry Configuration in the .npmrc File
...
@sap:registry=https://npm.sap.com
...

You can also use the npm command to configure the target registry for the current session:

$ npm config set @sap:registry https://npm.sap.com
$ npm install @sap/<node_package>
NPM Registry Configuration for SAP Web IDE for SAP HANA Build Tools
If you are using the build tools included in SAP Web IDE for SAP HANA to build your Node.js applications for XS advanced, you can configure SAP Web IDE for SAP HANA to use one or more specific NPM registries to resolve the dependencies between the resources specified in the development and deployment descriptors.

To specify a specific NPM registry that will be used for the resolution of dependency requirements when developing and building applications with SAP Web IDE for SAP HANA, add the "UPSTREAM_LINK" and (or) "SAPUPSTREAM_LINK" properties to the di-local-npm-registry module in the MTA extension descriptor (for example, sapwebide.mtaext) that is used when deploying SAP Web IDE, as illustrated in the following example:

Note
If a suitable MTA extension descriptor does not already exist for the deployment of SAP Web IDE, you must create one and add the suggested configuration details for the NPM registries.
Sample Code
MTA Extension Descriptor: NPM Registry Configuration for SAP Web IDE Deployment
...
modules:
  - name: di-local-npm-registry
    properties:
      UPSTREAM_LINK: "http://registry.npmjs.org"
      SAPUPSTREAM_LINK: "https://npm.sap.com"
...

```