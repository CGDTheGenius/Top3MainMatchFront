import BlueArtifact from '$lib/components/artifacts/BlueArtifact.svelte'
import GreenArtifact from '$lib/components/artifacts/GreenArtifact.svelte'
import RedArtifact from '$lib/components/artifacts/RedArtifact.svelte'
import VioletArtifact from '$lib/components/artifacts/VioletArtifact.svelte'
import YellowArtifact from '$lib/components/artifacts/YellowArtifact.svelte'
import BlankCell from '$lib/components/cells/BlankCell.svelte'
import GrassCell from '$lib/components/cells/GrassCell.svelte'
import RockCell from '$lib/components/cells/RockCell.svelte'
import SandCell from '$lib/components/cells/SandCell.svelte'
import TowerCell from '$lib/components/cells/TowerCell.svelte'
import TreeCell from '$lib/components/cells/TreeCell.svelte'
import WaterCell from '$lib/components/cells/WaterCell.svelte'

export const colorMap = {
  BLANK: 'white',
  TREE: 'teal',
  SAND: 'sandybrown',
  ROCK: 'gray',
  GRASS: 'greenyellow',
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
  VIOLET: 'violet',
  TOWER: 'skyblue',
}

export const cellTypeList = [
  { type: 'TREE', label: '나무', iconComponent: TreeCell },
  { type: 'WATER', label: '물', iconComponent: WaterCell },
  { type: 'SAND', label: '모래', iconComponent: SandCell },
  { type: 'ROCK', label: '바위', iconComponent: RockCell },
  { type: 'GRASS', label: '풀', iconComponent: GrassCell },
]

export const itemTypeList = [
  { type: 'RED', label: '빨강 유물', iconComponent: RedArtifact },
  { type: 'BLUE', label: '파랑 유물', iconComponent: BlueArtifact },
  { type: 'GREEN', label: '초록 유물', iconComponent: GreenArtifact },
  { type: 'YELLOW', label: '노랑 유물', iconComponent: YellowArtifact },
  { type: 'VIOLET', label: '보라 유물', iconComponent: VioletArtifact },
  { type: 'TOWER', label: '통신탑', iconComponent: TowerCell },
]

export const isCellType = (type) => cellTypeList.find((cell) => cell.type === type)
export const isItemType = (type) => itemTypeList.find((item) => item.type === type)
