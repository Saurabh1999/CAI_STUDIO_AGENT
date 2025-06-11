# Cloudera AI Agent Studio

> IMPORTANT: Please read the following before proceeding. This AMP includes or otherwise depends on certain third party software packages. Information about such third party software packages are made available in the notice file associated with this AMP. By configuring and launching this AMP, you will cause such third party software packages to be downloaded and installed into your environment, in some instances, from third parties' websites. For each third party software package, please see the notice file and the applicable websites for more information, including the applicable license terms.

> If you do not wish to download and install the third party software packages, do not configure, launch or otherwise use this AMP. By configuring, launching or otherwise using the AMP, you acknowledge the foregoing statement and agree that Cloudera is not responsible or liable in any way for the third party software packages.

> Copyright (c) 2025 - Cloudera, Inc. All rights reserved.

## About the Studio
Cloudera AI Agent Studio is a low-code and powerful platform for building, testing, and deploying AI agents and workflows. It provides an intuitive interface for creating custom AI tools and combining them into sophisticated automated workflows.

![Agent Studio Homepage](./images/for_docs/Agent-Studio-Home.png)

- Agent Studio ships with a set of pre-built tools and workflows (called "templates"). Use these to get started quickly.
- Users can create custom agents, tools and workflows. Test the workflows in the Studio. Save them as templates for reuse.
- Workflows can be deployed as a Workbench Model, ready for production use.

## Getting Started

### For Agent Studio Users
These docs are targeted for people that are using Agent Studio to build and deploy workflows. 
 - Configure an LLM for your agents to use. ([LLMs User Guide](./docs/user_guide/models.md))
 - Create new tools or go through our existing set of tools. *This step is optional.* ([Tools User Guide](./docs/user_guide/tools.md))
 - Configure [Model Context Protocol](https://modelcontextprotocol.io/introduction) servers to use with agents. *This step is optional.* ([MCP User Guide](./docs/user_guide/mcp.md))
 - Create, test, deploy and manage workflows. ([Workflows User Guide](./docs/user_guide/workflows.md))
 - Learn about using our example prepackaged workflow templates ([Workflow Templates Guide](docs/user_guide/workflow_templates.md))
 - Monitor your workflows. ([Monitoring User Guide](./docs/user_guide/monitoring.md))
 - Build custom UIs and [Applications](https://docs.cloudera.com/machine-learning/cloud/applications/topics/ml-applications-c.html) on top of your deployed workflows. ([Custom Applications Guide](./docs/user_guide/custom_workflow_application.md))

### For Agent Studio Admins
These docs are targeted for individuals managing the Agent Studio instance itself within a project.
 - *to come*

### For Agent Studio Tool Developers
These docs are targeted for individuals who are building custom Agent Studio tools
 - [Creating Custom Tools](./docs/user_guide/custom_tools.md)

### For [Model Context Protocol(MCP)](https://modelcontextprotocol.io/introduction) Users
These docs are targetted towards individuals looking to connect MCP servers to agents in workflows.
 - [MCP User Guide](./docs/user_guide/mcp.md)
 - [Barebones example of using a MCP Server in Agent Studio](./docs/user_guide/mcp_example.md)
