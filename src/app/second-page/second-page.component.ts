import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router'; 
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  filterByMake!: string;
  searchText!: string;

  itemsPerPage = 20;
  currentPage = 1;


  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filterByMake = params['brand']; // Get the value of "brand" from the URL query parameters
      this.getDataFromURL(); // Call the function to get data from URL and apply filters
    });
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const brandId = paramMap.get('brand');
    
    });
  }

  getDataFromURL() {
    const url = 'https://ev-database.continuousnet.com/models.json';
    this.http.get<any[]>(url).subscribe(
      (data: any[]) => {
        this.data = data.map((row) => ({
          vehicleMake: row.vehicleMake ? row.vehicleMake : '--',
          vehicleModel: row.vehicleModel ? row.vehicleModel : '--',
          id: row.id ? row.id : '--',
          images: row.images ? "https://ev-database.continuousnet.com/" + row.images[0] : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24INOvwoqegoHzBwJzA8YgZzyPRoGg03RT_n66EbX&s',
        }));
  
        // Remove duplicates based on vehicleModel
        const uniqueVehicleModels = this.data.reduce((acc, current) => {
          const x = acc.find((item: { vehicleModel: any; }) => item.vehicleModel === current.vehicleModel);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
  
        this.data = uniqueVehicleModels;
        this.applyFilters(); // Apply the filters once the data is loaded
      },
      (error) => {
        console.log('An error occurred while fetching data:', error);
      }
    );
  }
  
  updateSelectedVehicle(brandId: string) {
    // Update the filterByMake with the selected brandId
    this.filterByMake = brandId;
  
    // Call the function to apply filters based on the selected brandId
    this.applyFilters();
  
    // Update the selectedVehicle manually
    
  }

  applyFilters() {
    // Filter by brand
    this.filteredData = this.data.filter((vehicle) => {
      return !this.filterByMake || vehicle.vehicleMake.toLowerCase().includes(this.filterByMake.toLowerCase());
    });

    // Search in other columns
    if (this.searchText) {
      this.filteredData = this.filteredData.filter((vehicle) => {
        return (
          vehicle.vehicleMake.toLowerCase().includes(this.searchText.toLowerCase()) ||
           vehicle.vehicleModel.toLowerCase().includes(this.searchText.toLowerCase())
           

          // Add other search columns here
        );
      });
    }

    // Reset the current page to the first page when applying filters
    this.currentPage = 1;
  }

  onPageChange(event: LazyLoadEvent) {
    this.currentPage = (event.first !== undefined ? event.first : 0) / this.itemsPerPage + 1;
  }
  redirectToDataTablePage(brand: string) {
    this.router.navigate(['/Third'], { queryParams: { brand: brand } });
  }
  
}
