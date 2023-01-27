import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { InlineSVGModule } from "ng-inline-svg";
import { TableModule } from 'primeng/table';
import { DropdownModule } from "primeng/dropdown";
import { SliderModule } from "primeng/slider";
import { PaginatorModule } from "primeng/paginator";
import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { PipesModule } from "../../../pipes/pipes.module";
import { EditorModule } from "primeng/editor";
import { NgxDropzoneModule } from "ngx-dropzone";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    NewsComponent
  ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        InlineSVGModule,
        TableModule,
        DropdownModule,
        SliderModule,
        PaginatorModule,
        ProgressBarModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        InputTextareaModule,
        DialogModule,
        RippleModule,
        SweetAlert2Module,
        PipesModule,
        EditorModule,
        NgxDropzoneModule,
        CalendarModule
    ]
})
export class NewsModule { }