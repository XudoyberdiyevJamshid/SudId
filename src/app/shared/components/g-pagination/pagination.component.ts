import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'g-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class GPagination {
  // Inputs
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(10);
  readonly displayRange = input<number>(2);

  // Customizable color inputs with sensible defaults
  readonly activeBackgroundColor = input<string>('#107EED');
  readonly activeTextColor = input<string>('white');
  readonly hoverBackgroundColor = input<string>('#107EED');
  readonly defaultTextColor = input<string>('#107EED'); // Tailwind gray-700

  // Output
  pageChange = output<number>();

  // Computed signal (avtomatik ravishda qayta hisoblanadi)
  readonly visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    const current = this.currentPage();
    const total = this.totalPages();
    const range = this.displayRange();

    // Always show first page
    pages.push(1);

    // Start point for visible pages around current page
    const startPage = Math.max(2, current - range);

    // Show ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }

    // Add pages around current page
    for (let i = startPage; i <= Math.min(total - 1, current + range); i++) {
      pages.push(i);
    }

    // Show ellipsis before last page if needed
    if (current + range < total - 1) {
      pages.push('...');
    }

    // Always show last page if more than 1 page
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  });

  onPageChange(page: number | string): void {
    const pageNum = Number(page);
    if (pageNum >= 1 && pageNum <= this.totalPages() && pageNum !== this.currentPage()) {
      this.pageChange.emit(pageNum);
    }
  }
}
