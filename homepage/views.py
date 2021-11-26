from django.shortcuts import render
from django.http import HttpResponseRedirect, Http404
from django.urls import reverse
from django.http import HttpResponse
from .models import Book, Author, BookInstance, Genre

# Create your views here.
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin


def index(request):
    """
    Function for mirror home page
    """
    # Generate num of main objects
    num_books = Book.objects.all().count()
    num_instances = BookInstance.objects.all().count()

    # available book (status = 'a')
    num_instances_available = BookInstance.objects.filter(status__exact='a').count()
    num_authors = Author.objects.count() # Method 'all()' apply by default

    # HTML-patterns index.html with data inside

    return render(request, "homepage/index.html",
                  context={
                      'num_books': num_books,
                      'num_instances': num_instances,
                      'num_instances_available': num_instances_available,
                      'num_authors': num_authors,
                  })


class BookListView(generic.ListView):
    model = Book
    paginate_by = 10
    # context_object_name = 'my_book_list' # name of variable in a pattern
    # queryset = Book.objects.filter(title__icontains='war')[:5] # Get five books with world 'war' in the title
    # template_name = 'homepage/my_arbitrary_template_name_list.html' # Define name of pattern and it's path

    #


class BookDetailView(generic.DetailView):
    model = Book


class AuthorDetailView(generic.DetailView):
    model = Author


class AuthorListView(generic.ListView):
    model = Author
    paginate_by = 10


def book_detail_view(request, pk):
    try:
        book_id = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        raise Http404('Book does not exist')
    # book_id=get_object_or_404(Book, pk=pk)

    return render(
        request,
        'homepage/book_detail.html',
        context={'book': book_id,}
    )
