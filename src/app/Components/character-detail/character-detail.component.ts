import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../service/character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  episodes: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        if (!isNaN(id)) {
          this.characterService.getCharacterById(id).subscribe(data => {
            this.character = data;
            this.loadEpisodeDetails(data.episode); //
          }, error => {
            console.error('Error al cargar el personaje', error);
            this.router.navigateByUrl("not-found");
          });
        } else {
          console.error('Invalid ID format');
          this.router.navigateByUrl("not-found");
        }
      } else {
        console.error('ID parameter is missing');
        this.router.navigateByUrl("not-found");
      }
    });
  }

  loadEpisodeDetails(episodeUrls: string[]): void {
    this.characterService.getEpisodesByUrls(episodeUrls).subscribe(episodesData => {
      this.episodes = episodesData;
    }, error => {
      console.error('Error al cargar los episodios', error);
      this.errorMessage = 'No se pudieron cargar los episodios.';
    });
  }
}
