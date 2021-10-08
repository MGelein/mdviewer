const templates: Record<string, string> = {}
templates.city = `# %%FILENAME%%

### SPERM
- __Sociaal__: 
- __Politiek__: 
- __Economisch__: 
- __Religieus__: 
- __Militair__: 

### Generator

### Winkels`

templates.npc = `# %%FILENAME%%

### Overview
- __Name__: %%FILENAME%%
- __Sex, Race, Age__: 
- __Appearance__: 
- __High Ability__: 
- __Low Ability__: 
- __Mannerism__: 
- __Interaction__: 
- __Ideal__: 
- __Bond__: 
- __Flaw__: 

### Jeugd


### Familie`

templates.session = `# %%FILENAME%%
Introductory sentence

## 1. Potential Scenes
Scenes occur in mostly any sequence. Short, 1 sentence description of the scene.

## 2. Secrets and Clues
Write down 10 secrets or clues for each session. Keep it separate from location in session.

## 3. Fantastic Locations
Make 2 locations per hour of play, each:
1. Evocative name
2. Three fantastic aspects
3. Sometimes tie to character backgrounds.

## 4. NPC's
Give each NPC that is important enough to be prepared: Name, connection and a archetype.

## 5. Extra's
You can use either a shopping list from the players, or pick yourself, or even use a random droplist. `

export default templates;