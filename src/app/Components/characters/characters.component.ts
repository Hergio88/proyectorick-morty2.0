import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharacterService } from '../service/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  searchForm: FormGroup;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.fetchCharacters();

    const searchTermControl = this.searchForm.get('searchTerm');
    if (searchTermControl) {
      searchTermControl.valueChanges.subscribe(value => {
        this.onSearch(value);
      });
    }
  }

  fetchCharacters(): void {
    this.characterService.getCharacters('', this.currentPage).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.filteredCharacters = this.characters;
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
        this.router.navigateByUrl('not-found');
      }
    });
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredCharacters = this.characters;
    } else {
      this.filteredCharacters = this.characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchCharacters();
  }
}
