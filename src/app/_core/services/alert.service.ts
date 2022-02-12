import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertType } from '../enums/alert-type.enum';
import { Alert } from '../interfaces/alert.interface';

@Injectable({providedIn: 'root'})
export class AlertService {

  constructor(private toastr: ToastrService){}

  showAlert(alert: Alert){
    switch (alert.type) {
      case AlertType.Success:
        this.toastr.success(alert.message, '', alert.config);
        break;

      case AlertType.Error:
        this.toastr.error(alert.message, '', alert.config);
        break;

      case AlertType.Warning:
        this.toastr.warning(alert.message, '', alert.config);
        break;

      case AlertType.Info:
        this.toastr.info(alert.message, '', alert.config);
        break;

      default:
      case AlertType.Info:
        this.toastr.info(alert.message, '', alert.config);
        break;
    }
  }

}
