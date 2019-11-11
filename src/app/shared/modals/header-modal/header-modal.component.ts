import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeaderService } from 'src/app/services/header.service';
import { HeaderData } from 'src/app/models/header.models/header.data';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent implements OnInit {
 
  public choosePhoto: string;
  constructor(
    public dialogRef: MatDialogRef<HeaderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeaderData,
    private HeaderService: HeaderService
    ) { 
    }

  ngOnInit() {
  }

  closeAvatarModal(id: number): void{ 
    const profile = {
      imageProfile: this.choosePhoto
    }
    this.HeaderService.saveChooseImg(`users/avatar/${id}`, profile).subscribe();
    setTimeout(()=>this.dialogRef.close(),1000)
  }
  chooseImg(event: any, previousPhoto: string){
    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async function Main(){
        const file: any = event.target.files[0];
        if(!file){
            alert('Файл не выбран!')
        }
        return await toBase64(file)
    }
    Main().then((res: string) => {
      this.HeaderService.chooseImg(res) 
      let img: any  = document.getElementById('modal-photo');
      img.src = res;
      this.choosePhoto = res;
    })
  }


  

}
