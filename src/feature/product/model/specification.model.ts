import { BaseEntity } from '@shared/model'

export class ProductSpecification extends BaseEntity {
  dataRam: number
  dataStorage: number[]
  dimensionLength?: number
  dimensionWidth?: number
  dimensionDepth?: number
  dimensionUnit?: string
  dimensionWeight?: number
  batteryCapacity?: number
  batteryChargingSpeed?: number
  batteryReverseCharging?: number
  batteryType?: string
  batteryWirelessCharging?: number
  connectMobileStandard?: string
  connectConnectivity?: string[]
  connectWifiStandard?: string
  connectBluetoothVersion?: number
  connectAudio?: string
  cpuCores?: number
  cpuFrequency?: number[]
  cpuName: string
  displayAspectRatio?: string
  displayPixelDensity?: number
  displayRefreshRate?: number
  displayResolution?: string
  displayScreenToBody?: number
  displaySize?: number
}
