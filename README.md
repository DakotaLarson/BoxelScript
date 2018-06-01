# BoxelScript

## General Idea
Create a game in which users can create complex structures intuitively and accurately with a LOD comparable with basic structures created in Sketchup. Additionally, an extensive and intuitive API will be made available for the creation of plugins (mods). The game will have both a singleplayer and multiplayer experience with the former intended for use to create structures that can be exported to a server and the latter being the central experience that most users should have. 

## Inspiration From Former Titles
* Minecraft (Spigot)
  * Programmatic Customizability
    * Mods
    * Mini-Games
  * Distributed Servers
  Ease of Map Creation
* The Sims, RCT (Both early 2000s)
  * Creation of Homes
  * Integration of Everyday Items
  * Terrain Manipulation
* Gorescript
  * Browser Implementation
  * FPS Mechanics
* Garry's Mod
  * No Defined Rules
  * Users Create Their Own Games
* SketchUp
  * Architecture Tools
  * GUI Layout
  * Material/Color Availability
  * 3D Warehouse
  
## Advancements from Former Titles

### Source Control

The source of JavaScript (JS) cannot be kept private in nearly all cases. Therefore, instead of waging an obfuscation war, the source of this project will be kept open. 

### Licensing

Licensing will also allow server owners and developers to create content for profit without fear of litigation. This is to prevent issues such as the necessity of BuildTools for the Spigot API and the ‘non-cosmetic donation’ shutdown on multiplayer Minecraft servers. Pirated copies of the game will be minimized as servers grow due to the need of authentication, which according to terms will only be able to come from BoxelScript servers. 

## Features

### Tools

All complex structures can be created with triangles, by extension, rectangles, and extended more to rectangular prisms (boxes). Using boxes allows for most structures to be created with a recognizable level of detail. Therefore, the number to tools needed should be far less than the number used in SketchUp, thereby minimizing the learning curve necessary to build structures.

### API

The API needed for this game takes two forms: manipulation of the world and manipulation of the GUI. Manipulation of the world will require creation, modification, and deletion of the structures that are created in the world, much like the Spigot API. The Spigot API is fundamentally limited in the changes that can be made to the GUI. Therefore, manipulation of the GUI will include the ability to create, modify, and delete elements on the GUI. Naturally, limits will have to be imposed such as display (time between creation and deletion (epilepsy)), image content (restrict adult content), and quantity will be restricted.

### WebRTC

WebSockets are generally too slow for sub-second, real time data due to the reliance on TCP. WebRTC may be used to replace TCP with SCTP, the underlying protocol of WebRTC.

## Social Media

YouTube will be the primary platform for distributing information to the community. Discord will be the primary platform for community members to communicate and connect. Twitter, Instagram and Facebook will be used to update followers as needed.

* [YouTube](https://www.youtube.com/channel/UCkQLB3--Cx26bjPztWJazRA)
* [Discord](https://discord.gg/kGcw5M6)
* [Twitter](https://twitter.com/kotamigo)
* [Instagram](https://www.instagram.com/kotamigo/)
* [Facebook](https://www.facebook.com/KotamigoDev)

 ## Transparency
 
 One of the goals of this project is to be transparent with the followers of the project. The hope is to give followers a complete understanding of the performance of the project and its creator. This will be in the form of a monthly transparency report which will include statistics of how the YouTube channel, Patreon, and community have been doing.
 
 ## Finances
 
Community members will be able to support the creation of the project monthly through Patreon or one time donation through some other platform. This will be created once there has been progress worthy of contribution. The end goals of this project are not financially motivated. 
