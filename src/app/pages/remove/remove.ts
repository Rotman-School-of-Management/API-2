import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-remove',
  styleUrl: './remove.css',
  templateUrl: './remove.html',
})
export class Remove implements OnInit {
  item?: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.item = this.itemService.getItemById(id);
       console.log('Loaded item:', this.item); // Check if item is found
    }
  }

  confirmDelete(): void {
    if (this.item) {
      this.itemService.deleteItem(this.item.id);
      this.router.navigate(['/']);
    }
  }
}
