import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[];
  datatable = [];
  chart={
    height: 450,
    PieChart : 'PieChart' , 
    options: {
   // pieSliceText:'value',
    donut:'true',
    pieHole:0.4,
    is3D:true,
    backgroundColor: "transparent",
        }
 
      }
  constructor(private dataService: DataServiceService) { }


  
  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.active
              }

            })

            this.initChart('c');
          }, 
          complete : ()=>{
            this.loading = false;
          }
        }
      )
  }



  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {

    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])
    
    this.globalData.forEach(cs => {
      let value :number ;
      if (caseType == 'c')
        if (cs.confirmed > 50000)
          value = cs.confirmed
          
      if (caseType == 'a')
        if (cs.active > 50000)
          value = cs.active
      if (caseType == 'd')
        if (cs.deaths > 10000)
          value = cs.deaths
          
      if (caseType == 'r')
        if (cs.recovered > 10000)
            value = cs.recovered
        

        this.datatable.push([
            cs.country, value
          ])
    })
    console.log(this.datatable);

  }

}
