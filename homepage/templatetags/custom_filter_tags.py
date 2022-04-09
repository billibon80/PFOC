from django import template

register = template.Library()


@register.filter
def to_value(value):
    """
    Convert object Pandas to value
    """
    return value.split(" ", 1)[1].strip()


@register.filter
def to_range(db):
    """
    return range value
    """
    if isinstance(db, int):
        return range(db)

    return range(len(db))


@register.filter
def set_d_week(value):
    d_week = {0: "Пн", 1: "Вт", 2: "Ср", 3: "Чт", 4: "Пт", 5: "Сб", 6: "Вс", 7: "-"}
    return d_week[int(value)]


@register.simple_tag
def add_img_path(img_choice, img_add=None, text_replace=None, link=None):
    """
    Replace text_replace in path ImageField or path FilePathField
     and return one valid value (path img) or link
    """
    print(link)

    if link is not None:
        return link

    if img_choice != '':
        return str(img_choice).replace(text_replace, "")

    return str(img_add).replace(text_replace, "")



@register.simple_tag
def at_db(data, index):
    """
    return value db by index (object) or return dash(-) if value None
    """
    if data[int(index)] == "None":
        return "-"
    return data[int(index)]


@register.simple_tag
def get_db(data, index):
    """
    return value db (object)
    """
    return data[int(index)]
