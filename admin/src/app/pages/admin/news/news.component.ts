import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from "@angular/forms";
import { AuthService, UserType } from "../../../modules/auth";
import { BlogsService } from "../../../services/admin/blogs.service";
import { Blog } from "../../../interfaces/blog";
import { TranslationService } from "../../../modules/i18n";
import { UploadsService } from "../../../services/admin/uploads.service";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  blogs: Blog[]=[];
  blogDialog: boolean;
  unit: boolean;
  blog:{ date: Date; image: string; images: any[]; intro: string; name: string; description: string; active: boolean; _id: string; delete: boolean }=<Blog>{
    _id: '',
    name:  '',
    intro:  '',
    description: '',
    image: '',
    images: [],
    date: new Date(),
    delete: false,
    active: true,
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedBlogs: Blog[];
  files: File[] = [];
  statuses: any[];
  types:any[]=[];
  loading: boolean = true;
  image:any;
  imageInit:any;
  thumbnail:any;
  create:boolean=false;
  viewPassword:boolean=false;
  viewPass:boolean=false;
  pError:boolean=false;
  type={};
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;


  constructor(private titleService: Title,
              public translation: TranslationService,
              private uploads: UploadsService,
              private cdr: ChangeDetectorRef,
              private service: BlogsService,
              private auth: AuthService) {
    this.types = [
                  {name: 'Post', code: 'post'},
                  {name: 'Categoria', code: 'category'},
                ]
    this.titleService.setTitle("Comunicados");
    const loadingSubscr = this.isLoading$
        .asObservable()
        .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.getData();
    this.signedUser$ = this.auth.currentUserSubject.asObservable();
  }

  setUnit(){
    if (this.unit){
      this.unit = false;
    } else {
      this.unit = true;
    }
  }

  getData(){
    this.service.getBlogs().subscribe(response => {
      console.log(response);
      this.blogs = response.blogs;
      this.loading = false;
      this.statuses = [
        {label: 'Activo', value: true},
        {label: 'Des Activo', value: false},
      ];
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }


  replaceImage(image: any){
    image.onerror = '';
    image.src = 'assets/images/missing.png'
  }

  created() {
    this.blog = {
      _id: '',
      name: '',
      intro: '',
      description: '',
      image: '',
      images: [],
      date: new Date(),
      delete: false,
      active: true,
    };
    this.create=true;
    this.submitted = false;
    this.blogDialog = true;
  }

  editBlog(blog: Blog) {
    this.blog = {...blog};
    this.blogDialog = true;
    this.image = '';
    this.imageInit = blog.image;
    this.thumbnail = '';
    this.blog.date = new Date(this.blog.date);
    this.create=false;
    this.pError=false;
  }

  hideDialog() {
    this.blogDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  saveBlog(form: NgForm){
    if (this.create) {
      this.store(form);
      this.clearDropZone();
    }
    else {
      this.update(form);
      this.clearDropZone();
    }
    this.blogDialog = false;
    this.blog = {
      _id: '',
      name: '',
      intro: '',
      description: '',
      image: '',
      images: [],
      date: new Date(),
      delete: false,
      active: true,
    };
    this.pError=false;
  }

  store(form: NgForm) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', form.value.name);
    params.append('description', form.value.description);
    params.append('type_post', form.value.intro);
    params.append('intro', form.value.type.code);
    params.append('date', form.value.date);
    for(let p=0;this.files.length>p;p++){
      params.append('image', this.files[p]);
    }
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.postBlog(params).subscribe( response => {
      console.log(response);
      this.blogs.push(response.blog);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La noticia se creó con exíto.',
        timer: 2000
      });
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }

  update(form: NgForm) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', form.value.name);
    params.append('description', form.value.description);
    params.append('type_post', form.value.type.code);
    params.append('intro', form.value.intro);
    for(let p=0;this.files.length>p;p++){
      params.append('image', this.files[p]);
    }
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.putBlog(this.blog._id, params).subscribe( response => {
      const index = this.blogs.findIndex(item => item._id == response.blog._id);
      this.blogs[index] = response.blog;
      this.isLoading$.next(false);
      this.getData();
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La noticia se actualizo con exíto.',
        timer: 3000
      });
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }


  active(blog: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', blog);
    params.append('option', option.toString());
    this.service.activeBlog(params).subscribe(response => {
      let active = '';
      const index = this.blogs.findIndex(item => item._id == response.blog._id);
      this.blogs[index] = response.blog;
      this.isLoading$.next(false);
      this.getData();
      if (response.blog.active){
        active = 'activo';
      } else {
        active = 'des activo';
      }
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `La noticia se ${active} con exíto.`,
        timer: 2000
      });
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }

  delete(blog: string){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar la noticia?',
      text: '¡Esta apunto de eliminar la noticia!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.service.deleteBlog(blog).subscribe(response => {
          const index = this.blogs.findIndex(item => item._id == response.blog._id);
          this.blogs.splice(index, 1);
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'La noticia se elimino con exíto.',
            timer: 2000
          });
        }, error => {
          console.log(error);
          this.isLoading$.next(false);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: error.error.msg,
            timer: 2000
          });
          this.cdr.detectChanges();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelado',
            'No se elimino la noticia',
            'error'
        )
      }
    })
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.cdr.detectChanges();
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.cdr.detectChanges();
  }

  clearDropZone(){
    this.files.splice(0);
    this.cdr.detectChanges();
  }

  getImage(e: any){
    let file = e.target.files[0];
    this.image = file;
    this.uploadImage(file);
  }

  uploadImage(file: any){
    let reader = new FileReader();
    reader.onload = (e) => {
      //@ts-ignore
      this.thumbnail = e.target.result;
      this.cdr.detectChanges();
    }

    reader.readAsDataURL(file);
  }

  deleteImageGallery(img: string){
    this.isLoading$.next(true);
    this.uploads.deleteUploadGallery('blogs', this.blog._id, img).subscribe(response => {
      this.getData();
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `La imagen se eliminocon exíto.`,
        timer: 2000
      });
      this.cdr.detectChanges();
    }, error => {
      let message;
      if(error.status == 400){
        message = error.error.msg;
      } else {
        message = 'Se encontro un error, comunicate con el administrador del web-site';
      }
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: message,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
