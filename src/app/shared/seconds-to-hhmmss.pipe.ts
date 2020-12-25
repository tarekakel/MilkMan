import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHhmmss'
})
export class SecondsToHhmmssPipe implements PipeTransform {

  transform(totalSeconds: any): any {
    let result;
    if(totalSeconds == 0){
      result = "00:00:00"
    }else{
      var hours = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
      var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  
      // round seconds
      seconds = Math.round(seconds * 100) / 100
  
      result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    }
    
    return result;
  }

}
