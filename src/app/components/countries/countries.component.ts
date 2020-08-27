import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data : any=[];
  countries : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  cases=0;
  date=0;
  selectedCountryData : DateWiseData[]; 
  dateWiseData ;
  loading = true;
  dataTable=[];
  chart={
    height: 450,
    LineChart : 'LineChart' , 
    options: {
  
    backgroundColor: "transparent",
        }
      }
 
  constructor(private service : DataServiceService) { }

  ngOnInit(): void {

    merge(
      this.service.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ), 
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      
      {
        
        complete : ()=>{
         this.updateValues('Afghanistan');
         this.loading = false;
        }
      }
    )
    
    

  }

  updateChart(){
    console.log(this.selectedCountryData);
  //  dataTable.push(["Date" , 'Cases'])
    this.selectedCountryData.forEach(cs=>{
    //  console.log(cs.cases);
      this.dataTable.push([cs.date , cs.cases]);
     
    })
  //  console.log(this.dataTable);
   
  }

  updateValues(country : string){
    this.dataTable=[];
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.cases=cs.active
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })

    this.selectedCountryData  = this.dateWiseData[country]
    // console.log(this.selectedCountryData);
   
    this.updateChart();
  }

}