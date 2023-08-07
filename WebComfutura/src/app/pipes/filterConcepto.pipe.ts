import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterConcepto'
})
export class FilterConceptoPipe implements PipeTransform {

  transform(detalle:any[], idconcepto:number): any {
    var detalleNew :any[]=[];

    for (let row of detalle) {
        if (row.IdTipoMovCaja == idconcepto ) {
          detalleNew.push(row);
        }
    }
    return detalleNew;
  }

}


