import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent {
  
  data: any[] = [];
  constructor(private http: HttpClient,private router: Router) { }
  ngOnInit() {
      this.getDataFromURL(); // Call the function to get data from URL and apply filters
    };
    getDataFromURL() {
      const url = 'https://ev-database.continuousnet.com/models.json';
      this.http.get<any[]>(url).subscribe(
        (data: any[]) => {
          this.data = data.filter((item, index, self) => self.findIndex(i => i.vehicleMake === item.vehicleMake) === index);
          this.data = this.data.map((row) => ({
            vehicleMake: row.vehicleMake ? row.vehicleMake : '--',
            vehicleModel: row.vehicleModel ? row.vehicleModel : '--',
            makerImage: row.makerImage ? "https://ev-database.continuousnet.com/" + row.makerImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24INOvwoqegoHzBwJzA8YgZzyPRoGg03RT_n66EbX&s',
          }));
        
        },
        (error) => {
          console.log('Une erreur est survenue lors du chargement des données:', error);
        }
      );
    }
    

  redirectToDataTablePage(brand: string) {
    this.router.navigate(['/second'], { queryParams: { brand: brand } });
  }
  
}
