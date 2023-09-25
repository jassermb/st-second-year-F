import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  filterByMake!: string;
  searchText!: string;
  itemsPerPage = 20;
  currentPage = 1;
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number }[];
  images: any[] = [];
  selectedVehicle: any | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
        numScroll: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const brandId = paramMap.get('brand');
      if (brandId) {
        // Call the function to get data from URL and find the selected vehicle by its ID
        this.updateSelectedVehicle(brandId);
      } else {
        // Handle the case when brandId is null (e.g., show an error message or redirect to a default page)
        console.log('Brand ID is missing or invalid.');
        // Redirect to a default page, for example:
        // this.router.navigate(['/default-page']);
      }
    });
  }
  getDataFromURL(brandId: string) {
    const url = 'https://ev-database.continuousnet.com/models.json';
    this.http.get<any[]>(url).subscribe(
      (data: any[]) => {
        debugger
       // this.data = data.filter((item, index, self) => self.findIndex(i => i.vehicleMake === item.vehicleMake) === index);
        this.data = data.map((row) => ({
          vehicleMake: row.vehicleMake ? row.vehicleMake : '--',
          vehicleModel: row.vehicleModel ? row.vehicleModel : '--',
          drivetrainPowerHP: row.drivetrainPowerHP ? row.drivetrainPowerHP : '--',
          vehicleModelVersion: row.vehicleModelVersion ? row.vehicleModelVersion : '--',
          performanceAcceleration: row.performanceAcceleration ? row.performanceAcceleration : '--',
          performanceTopspeed: row.performanceTopspeed ? row.performanceTopspeed : '--',
          rangeWLTP: row.rangeWLTP ? row.rangeWLTP : '--',
          rangeReal: row.rangeReal ? row.rangeReal : '--',
          efficiencyReal: row.efficiencyReal ? row.efficiencyReal : '--',
          chargePlug: row.chargePlug ? row.chargePlug : '--',
          chargeStandardPower: row.chargeStandardPower ? row.chargeStandardPower : '--',
          chargeStandardPhase: row.chargeStandardPhase ? row.chargeStandardPhase : '--',
          chargeStandardPhaseAmp: row.chargeStandardPhaseAmp ? row.chargeStandardPhaseAmp : '--',
          batteryCapacityFull: row.batteryCapacityFull ? row.batteryCapacityFull : '--',

          id: row.id ? row.id : '--',
          images: row.images ? row.images.map((image: string) => ({
            itemImageSrc: "https://ev-database.continuousnet.com/" + image,
            thumbnailImageSrc: "https://ev-database.continuousnet.com/" + image
          })) : [],
        }));
        this.images = this.data.map(item => item.images[0]);

        // Find the selected vehicle by its ID instead of brand
        this.selectedVehicle = this.data.find(vehicle => vehicle.id === brandId) || null;
        debugger;
        this.applyFilters(); // Apply the filters once the data is loaded
      },
      (error) => {
        console.log('An error occurred while fetching data:', error);
      }
    );
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

  // Getter for the selected vehicle's images
  get selectedVehicleImages(): any[] {
    return this.selectedVehicle ? this.selectedVehicle.images : [];
  }

  // Add other getters for the selected vehicle's details here if needed
  get selectedVehicleMake(): string {
    return this.selectedVehicle ? this.selectedVehicle.vehicleMake : '';
  }

  get selectedVehicleModel(): string {
    return this.selectedVehicle ? this.selectedVehicle.vehicleModel : '';
  }

  // Add more getters for other vehicle details as needed
  updateSelectedVehicle(brandId: string) {
    this.getDataFromURL(brandId);
  }
}
