import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lotusfield';

  cardsByName: Map<string, MoxfieldCardHolder> = new Map();
  identifiers: ScryfallIdentifier[] = [];
  currentCommander: ScryfallCard | undefined;
  loadingCommander = true;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getDecklist();
  }

  getDecklist(): void {
    this.loadingCommander = true;
    this.httpClient
      .get<any>('/api/gets/decks/iTbYigJKC0i-Fv1XoTsarQ')
      .subscribe((x) => {
        this.identifiers = [];
        console.log(x as MoxfieldDeck);
        Object.entries(x[MoxfieldProperties.COMMANDERS]).forEach((y: any) => {
          this.cardsByName.set(y[0], y[1]);
          this.identifiers.push({
            id: this.cardsByName.get(y[0])?.card.scryfall_id ?? '',
          });
        });
        Object.entries(x[MoxfieldProperties.MAINBOARD]).forEach((y: any) => {
          this.cardsByName.set(y[0], y[1]);
          this.identifiers.push({
            id: this.cardsByName.get(y[0])?.card.scryfall_id ?? '',
          });
        });
        console.log(this.cardsByName);

        const test: ScryfallIdentifier[] = [];
        for (let i = 0; i < 30; i++) {
          test.push(this.identifiers[i]);
        }
        this.httpClient
          .post<any>('/api/posts/scryfall/collection', {
            identifiers: test,
          })
          .subscribe((x) => {
            console.log(x);
          });

        this.httpClient
          .get<ScryfallCard>('/api/gets/scryfall/' + this.identifiers[0].id)
          .subscribe((x: ScryfallCard) => {
            this.currentCommander = x;
            this.loadingCommander = false;
          });
      });
  }
}
export interface MoxfieldDeck {
  id: string;
}
export enum MoxfieldProperties {
  COMMANDERS = 'commanders',
  MAINBOARD = 'mainboard',
}
export interface MoxfieldCardKeyValue {
  key: string;
  value: MoxfieldCardHolder;
}
export interface MoxfieldCardHolder {
  boardType: string;
  card: MoxfieldCard;
  excludedFromColor: boolean;
  quantity: number;
}
export interface MoxfieldCard {
  id: string;
  cardmarket_id: number;
  prices: any;
  scryfall_id: string;
  name: string;
}
export interface ScryfallCollectionRequest {
  identifiers: ScryfallIdentifier[];
}
export interface ScryfallIdentifier {
  id: string;
}
export interface ScryfallCard {
  image_uris: {
    png: string;
  };
}
