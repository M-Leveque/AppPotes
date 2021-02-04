import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/tabs/album/album.service';
import { ConstantService } from 'src/app/constant.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
})
export class AlbumListComponent implements OnInit {
  
  private host: String;
  private path: Object;

  private showInputSearch = false;
  private selected = "";
  
  private albumSubscription;
  private sharedAlbum = {};
  public albums = [];

  //Save for albums
  private allAlbums : any[];

  constructor(private albumService : AlbumService,
              private constantService: ConstantService,
              private spinner: NgxSpinnerService) { 
  }

  ngOnInit() {

    this.host = this.constantService.host;
    this.path = this.constantService.path;
    
    this.spinner.show();

    this.albumSubscription = this.albumService.all()
    .subscribe( (albums) => {
      for(let album of albums){
        if (album.id == 1) this.sharedAlbum = album;
      }
      this.albums = albums;
      this.allAlbums = this.albums;
      this.spinner.hide();
    });  
  }


  public sort(value){
    this.albums.sort( (a, b) => {
      let v1 : any;
      let v2 : any;

      if(value === 'name'){
        v1 = a.name;
        v2 = b.name;
      }
      else{
        // convert date to epoch format
        v1 = new Date(a.date_created).getTime() / 1000;
        v2 = new Date(b.date_created).getTime() / 1000;
      }

      if( v1 > v2 )
        return 1;
      if( v1 < v2)
        return -1;
      return 0
    });
  }

  public search(event : any){
    let searchText = event.target.value;

    searchText = searchText.toLowerCase();

    this.albums = this.allAlbums.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }

  public setShowSearch(value: boolean){
    this.showInputSearch = value;
    this.albums = this.allAlbums;
  }

  public getCover(album){
    return this.albumService.getCovers(album);
  }

}
