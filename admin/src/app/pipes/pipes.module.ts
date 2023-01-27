import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { ImageGalleryPipe } from "./image-gallery.pipe";
import { DomSanitizerPipe } from "./dom-sanitizer.pipe";
import { TruncatePipe } from './truncate.pipe';



@NgModule({
  declarations: [
      ImagePipe,
      ImageGalleryPipe,
      DomSanitizerPipe,
      TruncatePipe
  ],
  exports: [
      ImagePipe,
      ImageGalleryPipe,
      DomSanitizerPipe,
      TruncatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
