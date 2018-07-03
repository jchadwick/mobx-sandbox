import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import cn from "classnames";
import { action, computed } from "mobx";

interface PagerProps {
  currentPage: number;
  totalPages?: number;
  onPageChanged(newPage: number): void;
}

@observer
export class Pager extends Component<PagerProps, never> {

  get totalPages() {
    return this.props.totalPages;
  }

  @computed
  get displayedPages() {
    return new Array(4)
      .fill(1)
      .reduce((pages, i, idx) => {
        const page = this.props.currentPage + idx;
        if(page <= this.totalPages) {
          pages.push(page);
        }
        return pages;
      }, []);
  }

  @action
  nextPage = () => {
    const newPage = this.props.currentPage + 1;

    console.log('TotalPages: ', this.totalPages)

    if (newPage > this.totalPages) {
      return;
    }

    this.triggerPageChange(newPage);
  };

  @action
  previousPage = () => {
    const newPage = this.props.currentPage - 1;

    if (newPage < 1) {
      return;
    }

    this.triggerPageChange(newPage);
  };

  @action
  triggerPageChange = (newPage: number) => {
    this.props.onPageChanged(newPage);
  };

  render() {
    const { currentPage = 1 } = this.props;

    return (
      <ul className="pagination">
        <li>
          <a
            className={cn({ disabled: currentPage === 1 })}
            aria-label="Previous"
            onClick={this.previousPage}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {this.displayedPages.map(i => (
          <li
            key={i}
            className={cn({ active: currentPage === i })}
            onClick={() => this.triggerPageChange(i)}
          >
            <a>{i}</a>
          </li>
        ))}
        <li>
          <a aria-label="Next" onClick={this.nextPage}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    );
  }
}
