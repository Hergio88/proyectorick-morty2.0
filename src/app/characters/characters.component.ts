import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../service/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private CharacterService: CharacterService,private router:Router) { }


  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.CharacterService.getCharacters(this.currentPage).subscribe(response => {
      this.characters = response.results;
      this.totalPages = response.info.pages;
    }, error => {
       this.router.navigateByUrl("not-found")
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchCharacters();
  }
}
