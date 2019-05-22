import { Component, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
import { Chart } from "chart.js";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { directive } from "@angular/core/src/render3/instructions";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "page-report-graph",
  templateUrl: "report-graph.html"
})
export class ReportGraphPage {
  @ViewChild("barCanvas") barCanvas;
  @ViewChild("doughnutCanvas") doughnutCanvas;
  @ViewChild("lineCanvas") lineCanvas;

  barChart: any;
  in;
  expenses: any = [];
  doughnutChart: any;
  lineChart: any;
  chartDataName: any;
  AddItemForm: FormGroup;
  chartDataValue: any;
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    private fb: FormBuilder
  ) {
    this.AddItemForm = this.fb.group({
      Category: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    this.sqlite
      .create({
        name: "ionicdb.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM category ORDER BY rowid DESC", [])
          .then(res => {
            this.chartDataName = [];
            for (var i = 0; i < res.rows.length; i++) {
              this.chartDataName.push({ name: res.rows.item(i).name });
            }
          })
          .then(() => {
            db.executeSql("SELECT * FROM tanscations ORDER BY rowid DESC", [])
              .then(res => {
                this.chartDataValue = [];
                for (var i = 0; i < res.rows.length; i++) {
                  this.chartDataValue.push({ Amount: res.rows.item(i).Amount });
                }
              })
              .then(() => {
                db.executeSql(
                  "SELECT * FROM category ORDER BY rowid DESC",
                  []
                ).then(res => {
                  this.expenses = [];
                  for (var i = 0; i < res.rows.length; i++) {
                    this.expenses.push({
                      rowid: res.rows.item(i).rowid,
                      name: res.rows.item(i).name
                    });
                  }
                });
              })
              .then(() => {
                let name = this.chartDataName.map(a => a.name);
                let values = this.chartDataValue.map(a => a.Amount);
                //console.log(name,"name")
                //console.log(values,"values")

                this.barChart = new Chart(this.barCanvas.nativeElement, {
                  type: "bar",
                  data: {
                    labels: name,
                    datasets: [
                      {
                        label: "Budgeting Trends",
                        data: values,
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                          "rgba(255,99,125,1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 10
                      }
                    ]
                  },
                  options: {
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    }
                  }
                });

                this.doughnutChart = new Chart(
                  this.doughnutCanvas.nativeElement,
                  {
                    type: "doughnut",
                    data: {
                      labels: name,
                      datasets: [
                        {
                          label: "Comparitive Graph",
                          data: values,
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)"
                          ],
                          hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                          ]
                        }
                      ]
                    }
                  }
                );

                this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                  type: "line",
                  data: {
                    labels: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July"
                    ],
                    datasets: [
                      {
                        label: "Yearly Trends",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: values,
                        spanGaps: false
                      }
                    ]
                  }
                });
              });
          });
      });
  }

  onChange($event) {
    this.getsubItems($event);
  }
  getsubItems($event) {
    this.sqlite
      .create({
        name: "ionicdb.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        console.log($event);
        db.executeSql("SELECT * FROM category WHERE name=?", [$event])
          .then(res => {
            this.chartDataName = [];

            for (var i = 0; i < res.rows.length; i++) {
              this.chartDataName.push({ name: res.rows.item(i).name });
            }
          })
          .then(() => {
            let name = this.chartDataName.map(a => a.name);
            console.log(this.chartDataName);
            let values = this.chartDataValue.map(a => a.Amount);
            //console.log(name,"name")
            //console.log(values,"values")

            this.barChart = new Chart(this.barCanvas.nativeElement, {
              type: "bar",
              data: {
                labels: name,
                datasets: [
                  {
                    label: "Budgeting Trends",
                    data: values,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                      "rgba(255,99,125,1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 100
                  }
                ]
              },
              options: {
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      }
                    }
                  ]
                }
              }
            });

            this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
              type: "doughnut",
              data: {
                labels: name,
                datasets: [
                  {
                    label: "Comparitive Graph",
                    data: values,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)"
                    ],
                    hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                    ]
                  }
                ]
              }
            });

            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
              type: "line",
              data: {
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July"
                ],
                datasets: [
                  {
                    label: "Yearly Trends",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: values,
                    spanGaps: false
                  }
                ]
              }
            });
          });
      });
  }
}
