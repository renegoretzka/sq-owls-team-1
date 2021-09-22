package com.amplifyframework.datastore.generated.model;

import com.amplifyframework.core.model.temporal.Temporal;

import java.util.List;
import java.util.UUID;
import java.util.Objects;

import androidx.core.util.ObjectsCompat;

import com.amplifyframework.core.model.Model;
import com.amplifyframework.core.model.annotations.Index;
import com.amplifyframework.core.model.annotations.ModelConfig;
import com.amplifyframework.core.model.annotations.ModelField;
import com.amplifyframework.core.model.query.predicate.QueryField;

import static com.amplifyframework.core.model.query.predicate.QueryField.field;

/** This is an auto generated class representing the Item type in your schema. */
@SuppressWarnings("all")
@ModelConfig(pluralName = "Items")
@Index(name = "itemsByList", fields = {"listID","updatedAt"})
public final class Item implements Model {
  public static final QueryField ID = field("Item", "id");
  public static final QueryField NAME = field("Item", "name");
  public static final QueryField QUANTITY = field("Item", "quantity");
  public static final QueryField STATUS = field("Item", "status");
  public static final QueryField LIST_ID = field("Item", "listID");
  public static final QueryField CREATED_AT = field("Item", "createdAt");
  public static final QueryField UPDATED_AT = field("Item", "updatedAt");
  private final @ModelField(targetType="ID", isRequired = true) String id;
  private final @ModelField(targetType="String", isRequired = true) String name;
  private final @ModelField(targetType="String") String quantity;
  private final @ModelField(targetType="ItemStatus", isRequired = true) ItemStatus status;
  private final @ModelField(targetType="ID", isRequired = true) String listID;
  private final @ModelField(targetType="AWSDateTime") Temporal.DateTime createdAt;
  private final @ModelField(targetType="AWSDateTime") Temporal.DateTime updatedAt;
  public String getId() {
      return id;
  }
  
  public String getName() {
      return name;
  }
  
  public String getQuantity() {
      return quantity;
  }
  
  public ItemStatus getStatus() {
      return status;
  }
  
  public String getListId() {
      return listID;
  }
  
  public Temporal.DateTime getCreatedAt() {
      return createdAt;
  }
  
  public Temporal.DateTime getUpdatedAt() {
      return updatedAt;
  }
  
  private Item(String id, String name, String quantity, ItemStatus status, String listID, Temporal.DateTime createdAt, Temporal.DateTime updatedAt) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.status = status;
    this.listID = listID;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  
  @Override
   public boolean equals(Object obj) {
      if (this == obj) {
        return true;
      } else if(obj == null || getClass() != obj.getClass()) {
        return false;
      } else {
      Item item = (Item) obj;
      return ObjectsCompat.equals(getId(), item.getId()) &&
              ObjectsCompat.equals(getName(), item.getName()) &&
              ObjectsCompat.equals(getQuantity(), item.getQuantity()) &&
              ObjectsCompat.equals(getStatus(), item.getStatus()) &&
              ObjectsCompat.equals(getListId(), item.getListId()) &&
              ObjectsCompat.equals(getCreatedAt(), item.getCreatedAt()) &&
              ObjectsCompat.equals(getUpdatedAt(), item.getUpdatedAt());
      }
  }
  
  @Override
   public int hashCode() {
    return new StringBuilder()
      .append(getId())
      .append(getName())
      .append(getQuantity())
      .append(getStatus())
      .append(getListId())
      .append(getCreatedAt())
      .append(getUpdatedAt())
      .toString()
      .hashCode();
  }
  
  @Override
   public String toString() {
    return new StringBuilder()
      .append("Item {")
      .append("id=" + String.valueOf(getId()) + ", ")
      .append("name=" + String.valueOf(getName()) + ", ")
      .append("quantity=" + String.valueOf(getQuantity()) + ", ")
      .append("status=" + String.valueOf(getStatus()) + ", ")
      .append("listID=" + String.valueOf(getListId()) + ", ")
      .append("createdAt=" + String.valueOf(getCreatedAt()) + ", ")
      .append("updatedAt=" + String.valueOf(getUpdatedAt()))
      .append("}")
      .toString();
  }
  
  public static NameStep builder() {
      return new Builder();
  }
  
  /** 
   * WARNING: This method should not be used to build an instance of this object for a CREATE mutation.
   * This is a convenience method to return an instance of the object with only its ID populated
   * to be used in the context of a parameter in a delete mutation or referencing a foreign key
   * in a relationship.
   * @param id the id of the existing item this instance will represent
   * @return an instance of this model with only ID populated
   * @throws IllegalArgumentException Checks that ID is in the proper format
   */
  public static Item justId(String id) {
    try {
      UUID.fromString(id); // Check that ID is in the UUID format - if not an exception is thrown
    } catch (Exception exception) {
      throw new IllegalArgumentException(
              "Model IDs must be unique in the format of UUID. This method is for creating instances " +
              "of an existing object with only its ID field for sending as a mutation parameter. When " +
              "creating a new object, use the standard builder method and leave the ID field blank."
      );
    }
    return new Item(
      id,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }
  
  public CopyOfBuilder copyOfBuilder() {
    return new CopyOfBuilder(id,
      name,
      quantity,
      status,
      listID,
      createdAt,
      updatedAt);
  }
  public interface NameStep {
    StatusStep name(String name);
  }
  

  public interface StatusStep {
    ListIdStep status(ItemStatus status);
  }
  

  public interface ListIdStep {
    BuildStep listId(String listId);
  }
  

  public interface BuildStep {
    Item build();
    BuildStep id(String id) throws IllegalArgumentException;
    BuildStep quantity(String quantity);
    BuildStep createdAt(Temporal.DateTime createdAt);
    BuildStep updatedAt(Temporal.DateTime updatedAt);
  }
  

  public static class Builder implements NameStep, StatusStep, ListIdStep, BuildStep {
    private String id;
    private String name;
    private ItemStatus status;
    private String listID;
    private String quantity;
    private Temporal.DateTime createdAt;
    private Temporal.DateTime updatedAt;
    @Override
     public Item build() {
        String id = this.id != null ? this.id : UUID.randomUUID().toString();
        
        return new Item(
          id,
          name,
          quantity,
          status,
          listID,
          createdAt,
          updatedAt);
    }
    
    @Override
     public StatusStep name(String name) {
        Objects.requireNonNull(name);
        this.name = name;
        return this;
    }
    
    @Override
     public ListIdStep status(ItemStatus status) {
        Objects.requireNonNull(status);
        this.status = status;
        return this;
    }
    
    @Override
     public BuildStep listId(String listId) {
        Objects.requireNonNull(listId);
        this.listID = listId;
        return this;
    }
    
    @Override
     public BuildStep quantity(String quantity) {
        this.quantity = quantity;
        return this;
    }
    
    @Override
     public BuildStep createdAt(Temporal.DateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
    
    @Override
     public BuildStep updatedAt(Temporal.DateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }
    
    /** 
     * @param id id
     * @return Current Builder instance, for fluent method chaining
     */
    public BuildStep id(String id) {
        this.id = id;
        return this;
    }
  }
  

  public final class CopyOfBuilder extends Builder {
    private CopyOfBuilder(String id, String name, String quantity, ItemStatus status, String listId, Temporal.DateTime createdAt, Temporal.DateTime updatedAt) {
      super.id(id);
      super.name(name)
        .status(status)
        .listId(listId)
        .quantity(quantity)
        .createdAt(createdAt)
        .updatedAt(updatedAt);
    }
    
    @Override
     public CopyOfBuilder name(String name) {
      return (CopyOfBuilder) super.name(name);
    }
    
    @Override
     public CopyOfBuilder status(ItemStatus status) {
      return (CopyOfBuilder) super.status(status);
    }
    
    @Override
     public CopyOfBuilder listId(String listId) {
      return (CopyOfBuilder) super.listId(listId);
    }
    
    @Override
     public CopyOfBuilder quantity(String quantity) {
      return (CopyOfBuilder) super.quantity(quantity);
    }
    
    @Override
     public CopyOfBuilder createdAt(Temporal.DateTime createdAt) {
      return (CopyOfBuilder) super.createdAt(createdAt);
    }
    
    @Override
     public CopyOfBuilder updatedAt(Temporal.DateTime updatedAt) {
      return (CopyOfBuilder) super.updatedAt(updatedAt);
    }
  }
  
}
