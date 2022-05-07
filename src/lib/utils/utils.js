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
import HorizontalWall from '$lib/components/walls/HorizontalWall.svelte'
import VerticalWall from '$lib/components/walls/VerticalWall.svelte'

export const cellTypeList = [
  { type: 'BLANK', label: '빈칸', iconComponent: BlankCell },
  { type: 'TREE', label: '나무', iconComponent: TreeCell },
  { type: 'WATER', label: '물', iconComponent: WaterCell },
  { type: 'SAND', label: '모래', iconComponent: SandCell },
  { type: 'ROCK', label: '바위', iconComponent: RockCell },
  { type: 'GRASS', label: '풀', iconComponent: GrassCell },
]

export const wallTypeList = [
  { type: 'H_WALL', label: '수평벽', iconComponent: HorizontalWall },
  { type: 'V_WALL', label: '수직벽', iconComponent: VerticalWall },
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
export const isWallType = (type) => wallTypeList.find((wall) => wall.type === type)
export const isItemType = (type) => itemTypeList.find((item) => item.type === type)

const _iconMap = {}
cellTypeList.forEach((cell) => (_iconMap[cell.type] = cell.iconComponent))
itemTypeList.forEach((item) => (_iconMap[item.type] = item.iconComponent))
export const iconMap = _iconMap

export function increase_brightness(hex, percent) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '')

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, '$1$1')
  }

  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16)

  return (
    '#' +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  )
}
