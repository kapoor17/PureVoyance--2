import {Injectable} from '@angular/core';
import {Package} from 'src/app/core/interfaces/packages/package';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {
  private selectedPackageSource: Package;
  private packagesSource: Package[] = [];
  private totalPackagesSource: number;
  private rechargeResult: boolean = false;

  public get packages(): Package[] {
    return this.packagesSource;
  }

  public get selectedPackage(): Package {
    return this.selectedPackageSource;
  }

  public get totalPackages(): number {
    return this.totalPackagesSource;
  }

  public get rechargeSuccessful(): boolean {
    return this.rechargeResult;
  }

  public setPackages(packages: Package[], total: number): void {
    this.packagesSource = packages;
    this.totalPackagesSource = total;
    this.rechargeResult = Math.random() < 0.5;
  }

  public selectPackage(pack: Package): void {
    this.selectedPackageSource = pack;
  }
}
