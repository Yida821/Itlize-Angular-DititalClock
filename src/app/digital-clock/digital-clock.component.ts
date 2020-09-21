import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-digital-clock",
  templateUrl: "./digital-clock.component.html",
  styleUrls: ["./digital-clock.component.css"],
})
export class DigitalClockComponent implements OnInit {
  private date = new Date();

  private hour: number;
  private minute: number;
  private second: number;
  private ampm: number;

  public hourString: string;
  public minuteString: string;
  public secondString: string;
  public ampmString: string;

  private counter;

  constructor() {}

  //life cycle hook, this function is called after the constructor
  ngOnInit() {
    const date = new Date();
    this.initiateTimmer(date); // set the current time to html
    this.timeChange();
    this.counter = setInterval(() => {
      this.timeChange();
    }, 1000);
  }

  private initiateTimmer(date) {
    const hours = date.getHours();
    //console.log(hours);
    this.ampm = hours >= 12 ? 1 : -1;
    this.ampmString = this.ampm == 1 ? "PM" : "AM";
    //console.log(this.ampmString);

    this.hour = hours % 12;
    //console.log((this.hour = hours % 12));
    this.hour = this.hour == 0 ? 12 : this.hour; //?
    this.hourString =
      this.hour < 10 ? "0" + this.hour.toString() : this.hour.toString();

    const minutes = date.getMinutes();
    this.minute = minutes;
    this.minuteString = minutes < 10 ? "0" + minutes : minutes.toString();

    //console.log(minutes);

    const seconds = date.getSeconds();
    this.second = seconds;
    this.secondString = seconds < 10 ? "0" + seconds : seconds.toString();
    //console.log(seconds);
  }

  private timeChange() {
    // console.log("this.hour " + this.hour);
    // console.log("this.minute " + this.minute);
    // console.log("this.second " + this.second);
    // console.log("this.ampm " + this.ampm);
    // console.log("type of hour: " + typeof this.hour);
    // console.log("type of minute: " + typeof this.minute);
    // console.log("type of second: " + typeof this.second);
    // console.log("type of ampm: " + typeof this.ampm);

    this.second += 1;

    //console.log("second + 1: " + this.second);

    if (this.second >= 60) {
      this.minute += 1;
      this.second = 0;
      if (this.minute >= 60) {
        this.hour += 1;
        this.minute = 0;
        // turns to be 12 pm from 11 am
        if (this.hour == 12) {
          this.ampm *= -1;
        }

        // 12:59:59
        else if (this.hour > 12) {
          this.hour = 1;
        }
      }
    }
    this.secondString =
      this.second < 10 ? "0" + this.second.toString() : this.second.toString();
    this.minuteString =
      this.minute < 10 ? "0" + this.minute.toString() : this.minute.toString();
    this.hourString =
      this.hour < 10 ? "0" + this.hour.toString() : this.hour.toString();
    this.ampmString = this.ampm == 1 ? "PM" : "AM";
  }

  startCounting() {
    this.counter = setInterval(() => {
      this.timeChange();
    }, 1000);
  }

  clickToStop() {
    clearInterval(this.counter);
  }

  saveSecond(event) {
    this.second = Number(event.target.value);
    if (isNaN(this.second)) {
      alert("Please Enter a number");
    } else if (this.second > 59 || this.second < 0) {
      alert("Invalid Input, Please Enter a Number between 0-59");
    } else {
      this.startCounting();
    }
  }

  saveMinute(event) {
    this.minute = Number(event.target.value);
    if (isNaN(this.minute)) {
      alert("Please Enter a number");
    } else if (this.minute > 59 || this.minute < 0) {
      alert("Invalid Input, Please Enter a Number between 0-59");
    } else {
      this.startCounting();
    }
  }

  saveHour(event) {
    this.hour = Number(event.target.value);
    if (isNaN(this.second)) {
      alert("Please Enter a number");
    } else if (this.ampm == -1 && (this.hour > 11 || this.hour < 0)) {
      alert("Invalid Input, Please Enter a Number between 0-11 for AM");
    } else if (this.ampm == 1 && (this.hour > 12 || this.hour < 1)) {
      alert("Invalid Input, Please Enter a Number between 1-12 for PM");
    } else {
      this.startCounting();
    }
  }
  //0-11 am 11am => 12pm 12 is only pm
  //12 - 11 pm  11pm => 0am 0 is only am
  saveAmpm(event) {
    console.log("before change " + this.ampmString);
    let temp = event.target.value;
    console.log("TEMP " + temp);

    if (temp.toLowerCase() == "am") {
      if (this.hour >= 12 || this.hour < 0) {
        alert("AM ranges from 0 - 11");
      } else {
        this.ampm *= -1;
        console.log("after change: " + this.ampmString);
        this.startCounting();
      }
    } else if (temp.toLowerCase() == "pm") {
      if (this.hour <= 0 || this.hour > 12) {
        alert("PM ranges from 1 - 12");
      } else {
        this.ampm *= -1;
        console.log("after change: " + this.ampmString);
        this.startCounting();
      }
    } else {
      alert("Must type in AM or PM!");
    }
  }
}
