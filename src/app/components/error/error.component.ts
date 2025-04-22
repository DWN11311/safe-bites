import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-error',
  standalone: true,
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorPageComponent implements OnInit {
  errorCode: number = 404;
  errorMessage: string = 'Page Not Found';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('Error Params:', params);

      if (params.get('code')) {
        this.errorCode = +params.get('code')!;
      }
      if (params.get('message')) {
        this.errorMessage = params.get('message')!;
      }
    });
  }
}
