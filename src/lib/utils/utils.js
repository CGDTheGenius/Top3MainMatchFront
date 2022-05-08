import BlueArtifact from '$lib/components/artifacts/BlueArtifact.svelte'
import GreenArtifact from '$lib/components/artifacts/GreenArtifact.svelte'
import RedArtifact from '$lib/components/artifacts/RedArtifact.svelte'
import FakeArtifact from '$lib/components/artifacts/FakeArtifact.svelte'
import YellowArtifact from '$lib/components/artifacts/YellowArtifact.svelte'
import BlankCell from '$lib/components/cells/BlankCell.svelte'
import GrassCell from '$lib/components/cells/GrassCell.svelte'
import RockCell from '$lib/components/cells/RockCell.svelte'
import SandCell from '$lib/components/cells/SandCell.svelte'
import TreeCell from '$lib/components/cells/TreeCell.svelte'
import WaterCell from '$lib/components/cells/WaterCell.svelte'
import Tower from '$lib/components/Tower.svelte'
import HorizontalWall from '$lib/components/walls/HorizontalWall.svelte'
import VerticalWall from '$lib/components/walls/VerticalWall.svelte'
import SoilCell from '$lib/components/cells/SoilCell.svelte'
import GravelCell from '$lib/components/cells/GravelCell.svelte'
import HorizontalFakeWall from '$lib/components/walls/HorizontalFakeWall.svelte'
import VerticalFakeWall from '$lib/components/walls/VerticalFakeWall.svelte'

export const cellTypeList = [
  { type: 'BLANK', label: '빈칸', iconComponent: BlankCell },
  { type: 'TREE', label: '나무', iconComponent: TreeCell },
  { type: 'WATER', label: '물', iconComponent: WaterCell },
  { type: 'SAND', label: '모래', iconComponent: SandCell },
  { type: 'ROCK', label: '바위', iconComponent: RockCell },
  { type: 'GRASS', label: '잔디', iconComponent: GrassCell },
  { type: 'SOIL', label: '흙', iconComponent: SoilCell },
  { type: 'GRAVEL', label: '자갈', iconComponent: GravelCell },
]

export const wallTypeList = [
  { type: 'H_WALL', label: '수평벽', iconComponent: HorizontalWall },
  { type: 'V_WALL', label: '수직벽', iconComponent: VerticalWall },
]

export const fakeWallTypeList = [
  { type: 'H_WALL_FAKE', label: '가짜 수평벽', iconComponent: HorizontalFakeWall },
  { type: 'V_WALL_FAKE', label: '가짜 수직벽', iconComponent: VerticalFakeWall },
]

export const itemTypeList = [
  { type: 'RED', label: '빨강 유물', iconComponent: RedArtifact },
  { type: 'YELLOW', label: '노랑 유물', iconComponent: YellowArtifact },
  { type: 'GREEN', label: '초록 유물', iconComponent: GreenArtifact },
  { type: 'BLUE', label: '파랑 유물', iconComponent: BlueArtifact },
  { type: 'FAKE', label: '워프 트랩', iconComponent: FakeArtifact },
  { type: 'TOWER', label: '통신탑', iconComponent: Tower },
]

export const artifactList = itemTypeList.filter((item) =>
  ['RED', 'BLUE', 'GREEN', 'YELLOW'].includes(item.type)
)

export const isCellType = (type) => cellTypeList.find((cell) => cell.type === type)
export const isWallType = (type) =>
  wallTypeList.concat(fakeWallTypeList).find((wall) => wall.type === type)
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

export const getDegree = (dx, dy) => {
  if (dx == -1) return 0
  if (dx == 1) return 180
  if (dy == -1) return 270
  if (dy == 1) return 90
  return 0
}

export const getPlayerUndoneTaskSummary = (task) => {
  if (!task) return '동작을 예약해주세요'
  if (task.type === 'MOVE') {
    const step = parseInt(task.value)
    if (step > 0) return `앞으로 ${step}칸 이동 예약됨`
    else return `뒤로 ${Math.abs(step)}칸 이동 예약됨`
  }
  if (task.type === 'ROTATE') {
    const step = parseInt(task.value)
    if (step > 0) {
      return `오른쪽으로 90도 회전 예약됨`
    } else {
      return `왼쪽으로 90도 회전 예약됨`
    }
  }
  if (task.type === 'COMMUNICATE') {
    return `조력자에게 '${task.value}' 전달 예약됨`
  }
  if (task.type === 'NOOP') {
    return '아무 행동 안함'
  }
  return '알 수 없는 행동'
}

export const getPlayerPrevTaskSummary = (task) => {
  if (!task) return ''
  const errorMessage = !task.error ? ' 성공' : ' 실패<br>' + task.error
  if (task.type === 'MOVE') {
    const step = parseInt(task.value)
    if (step > 0) return `앞으로 ${step}칸 이동` + errorMessage
    else return `뒤로 ${Math.abs(step)}칸 이동` + errorMessage
  }
  if (task.type === 'ROTATE') {
    const step = parseInt(task.value)
    if (step > 0) {
      return `오른쪽으로 90도 회전` + errorMessage
    } else {
      return `왼쪽으로 90도 회전` + errorMessage
    }
  }
  if (task.type === 'COMMUNICATE') {
    return `조력자에게 '${task.value}' 전달` + errorMessage
  }
  if (task.type === 'REVERSE_COMMUNICATE') {
    return `조력자에게서 '${task.value}' 수신` + errorMessage
  }
  if (task.type === 'NOOP') {
    return ''
  }
  return '알 수 없는 행동을 함'
}

export const getAssistantUndoneTaskSummary = (task) => {
  if (!task) return '메시지를 예약해주세요'
  if (task.type === 'COMMUNICATE') {
    return `플레이어에게 '${task.value}' 전달 예약됨`
  }
  if (task.type === 'NOOP') {
    return '메시지 보내지 않음'
  }
  return '알 수 없는 행동'
}

export const getAssistantPrevTaskSummary = (task) => {
  if (!task) return ''
  const errorMessage = !task.error ? ' 성공' : ' 실패<br>' + task.error
  if (task.type === 'COMMUNICATE') {
    return `플레이어에게 '${task.value}' 전달` + errorMessage
  }
  if (task.type === 'REVERSE_COMMUNICATE') {
    return `플레이어에게서 '${task.value}' 수신` + errorMessage
  }
  if (task.type === 'NOOP') {
    return ''
  }
  return '알 수 없는 행동을 함'
}
